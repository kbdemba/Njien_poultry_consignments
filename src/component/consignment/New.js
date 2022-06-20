import React, { useState, useEffect }  from 'react'
import { useRouter } from "next/router";
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import NewGeneralInfo from './NewGeneralInfo';
import NewTable from './NewTable';
import NewItemModal from './NewItemModal';
import ConfirmModal from '../ConfirmModal';
import SummaryModal from './SummaryModal';
import { validateGInfo } from '../../utility/validation';
import {to2decimal} from '../../utility/helpers';
import Snack from '../Snack';
import {addConsignment, updateConsignment} from '../../config/firestore'

function NewConsignment(props) {
  const router = useRouter()
  const [openAddItem, setOpenAddItem] = useState({open:false});
  const [openSummary, setOpenSummary] = useState(false);
  const [condirmData, setConfirmData] = useState({open: false, handleConfirm: ()=>{}});
  const [snackSettings, setSnackSettings] = useState({open: false});
  const [items, setItems] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [finalData, setFinalData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [gInfoValues, setGInfo] = useState({ // Move this to whole to ginfo compo and set as the u set the items
    name: "",
    date: new Date(),
    conversion: 450, //TODO: from local storage
    customPayBag: 12,
    laborBag: 5,
    transportation: 0,
  });

  const {edit, initData} = props;

  useEffect(() => {
    if(edit){
      const {name,date,conversion,customPayBag,laborBag,transportation, remarks} = initData
      setGInfo({name,conversion,customPayBag,laborBag,transportation, date: new Date(date.seconds * 1000) })
      setItems(initData.items)
      setRemarks(remarks)
    }
  }, [])
  
  const goBack = ()=>{
    if(edit){
      router.push(`/consignment/${initData.id}`)
    }else{
      router.push('/')
    }
  }
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackSettings({open: false});
  };
  const handleCloseAddItem = () => {
    setOpenAddItem({open:false})
    
  };
  const openEditItem = (id)=>{
    setOpenAddItem({open:true, editing:id });
  }

  const handleOpenAddItem = () => {
    setErrors({})
    // Should Snack that there is an error and only validate conversion
    const { errors } = validateGInfo(gInfoValues)
    if(errors){
      setSnackSettings({open: true, type:'error', message:'Check the errors on Geneal info form'})
      setErrors(errors)
      return;
    }
    setOpenAddItem({open:true});
  };

  const handleCloseSummary = () => setOpenSummary(false);
  const handleOpenSummary = () => {
    const { errors } = validateGInfo(gInfoValues)
    if(errors){
      setSnackSettings({open: true, type:'error', message:'Check the errors on Geneal info form'})
      setErrors(errors)
      return;
    }
    calcSummary( true )
    setOpenSummary(true);
  };
  

  const handleOpenConfirm = (rowData) => {
    const data = {
      name: rowData.name,
      open: true, 
      handleConfirm: ()=>{deleteItem(rowData)},
      message: `Do you want to remove the item "${rowData.name}"?`,
    }
    setConfirmData(data);
  };
  const handleCloseConfirm = () => {
    setConfirmData({open: false, handleconfirm: ()=>{}});
  };

  const calcSummary = (shouldSetFinalData)=>{
    
    let totalCostGoods = 0, totalBags=0, totalweight=0;
    // calc Total Cost of Goods
    items.forEach(item => {
      totalCostGoods += item.totalCostGMD;
      totalBags += item.numberOfBags;
      totalweight += item.weight;
    });

    // calc Extra Cost
    const transportation = gInfoValues.transportation;
    const totalCustom = gInfoValues.customPayBag * totalBags;
    const totalLabor = gInfoValues.laborBag * totalBags;
    const totalExtaCost = transportation + totalCustom + totalLabor;
    // calc Overall Total Cost
    const overallTotalCost = totalCostGoods + totalExtaCost;

    // Extra Cost per unit cost
    const extraCostperGood = to2decimal(totalExtaCost / totalBags);

    // Add true cost
    const newItems = items.map(item => ({...item, trueCostItem: extraCostperGood + item.unitCostGMD }))

    setItems(newItems)
    if(shouldSetFinalData === true){
      const finalData = {
        ...gInfoValues,
        totalCustom,
        totalLabor,

        totalItems: items.length,
        totalBags,
        totalweight,

        totalCostGoods,
        totalExtaCost,
        overallTotalCost,

        extraCostperGood,
        remarks,

        items: newItems,
      
      }
    
    setFinalData(finalData)
    }
  }

  const calcTrueCost = () => {
    const { errors } = validateGInfo(gInfoValues)
    if(errors){
      setSnackSettings({open: true, type:'error', message:'Check the errors on Geneal info form'})
      setErrors(errors)
      return;
    }
    calcSummary()
  }

  const handleAddConsignment = async () => {
    setLoading(true)
    const {id, error} = await addConsignment(finalData)
    setLoading(false)
    if(error){
      setSnackSettings({open: true, type:'error', message:`Error: ${error.message}`})
    }else{
      router.push({
        pathname: `/consignment/${id}`,
        query: { routerSnackMsg: 'Successfully created a new consignment' }
      })
    }
  }
  const handleUpdateConsignment = async () => {
    setLoading(true)
    const {data, error} = await updateConsignment(finalData, initData.id)
    setLoading(false)
    if(error){
      setSnackSettings({open: true, type:'error', message:`Error: ${error.message}`})
    }else{
      console.log(data, 'updated data')
      router.push({
        pathname: `/consignment/${initData.id}`,
        query: { routerSnackMsg: 'Successfully updated consignment' }
      })
    }
  }
  const deleteItem = (rowData) => {
    setItems(items.filter(item => item.name !== rowData.name))
    handleCloseConfirm()
    setSnackSettings({open: true, type:'success', message:'Successfully removed item'})
  }
  const actions = [
    {
      icon: ()=> <EditIcon color='action'/>,
      tooltip: 'Edit Row',
      onClick: (event, rowData) => openEditItem(rowData.name)
    },
    {
      icon: ()=> <DeleteForeverIcon color='action'/>,
      tooltip: 'Delete Row',
      onClick: (event, rowData) => {
        console.log(rowData)
        handleOpenConfirm(rowData)
      }
    }
  ]

  return (
    <>
      <Snack 
        handleOnClose={handleCloseSnack}
        snackSettings={snackSettings}
      />
      <div style={{padding:'16px 0', display:'flex', alignItems:'center'}}>
        <IconButton
          aria-label="go Back"
          onClick={goBack}
          sx={{mr:1.5}}
        >
          <ArrowBackIcon />
        </IconButton>
        
        <Typography variant='h5' sx={{fontWeight: 500}}>{edit ? 'Edit' : "Create New"} Consignment</Typography>
      </div>
  
      <div style={{padding:'8px 0 12px'}}>
        <Typography variant='subtitle1' gutterBottom sx={{fontSize: '1.2em'}}>General Information</Typography>
        <NewGeneralInfo 
          values={gInfoValues} setValues={setGInfo} errors={errors} setErrors={setErrors}
          remarks={remarks} setRemarks={setRemarks}
        />
      </div>

      <div style={{padding:'18px 0 0'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <Typography variant='subtitle1' sx={{fontSize: '1.2em'}} >Items</Typography>
          <div>
            <Button 
              variant='contained'
              disableElevation
              onClick={handleOpenAddItem}
              sx={{mr:2}}
              size='small'
            >
              Add New Item
            </Button>
            <Button 
              // variant='outlined'
              size='small'
              onClick={calcTrueCost}
              disableElevation
            >
              Calculate True Cost
            </Button>
          </div>
        </div>

        <NewTable 
          data={items}
          actions={actions}
        />
      </div>
      <div style={{display:'flex', justifyContent:'flex-end'}}>
        <Button 
          size='large'
          variant='contained'
          onClick={handleOpenSummary}
          disabled={(items.length < 1)}
        >
          Review and save {edit ? 'Changes' : "Data"}
        </Button>
      </div>
     

      <NewItemModal 
        open={openAddItem.open}
        handleClose={handleCloseAddItem}
        conversion={gInfoValues.conversion}
        items={items}
        setItems={setItems}
        setSnackSettings={setSnackSettings}
        editing={openAddItem.editing}

      />
      <ConfirmModal 
        open={condirmData.open}
        handleClose={handleCloseConfirm}
        handleConfirm={condirmData.handleConfirm}
        message={condirmData.message}
        name={condirmData.name}
      />
      <SummaryModal
        open={openSummary}
        handleClose={handleCloseSummary}
        handleConfirm={!edit ? handleAddConsignment : handleUpdateConsignment}
        finalData={finalData}
        loading={loading}
        edit={edit}
      />
    </>
  )
}

export default NewConsignment;
