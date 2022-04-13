import { isValid } from 'date-fns'

export const validateAddItem = (data, items, editing)=>{
  let errors = {}
    // TODO: Sanitize all inputs

    // Cannot add two names
    // if data.name === editing, then dont validate
    if( items.filter(item => item.name === data.name).length > 0 ){
      if(data.name !== editing){
        errors.name = `${data.name} has already been added`;
      }
    }
    if(data.name.length < 1) errors.name = 'Feed Name is required';

    if(typeof data.numberOfBags !== 'number') errors.numberOfBags = 'Number of bags should be a number';
    if(data.numberOfBags < 1) errors.numberOfBags = 'Must be greater than 0';

    if(typeof data.weight !== 'number') errors.weight = 'Weight should be a number';
    if(data.weight < 0) errors.weight = 'Must be greater than 0';

    if(typeof data.weight !== 'number') errors.weight = 'Weight should be a number';
    if(data.weight < 0) errors.weight = 'Cannot be a negative number';

    if(typeof data.unitCostGMD !== 'number') errors.unitCostGMD = 'unitCostGMD should be a number';
    if(data.unitCostGMD < 0) errors.unitCostGMD = 'Cannot be a negative number';

    if(typeof data.totalCostGMD !== 'number') errors.totalCostGMD = 'totalCostGMD should be a number';
    if(data.totalCostGMD < 0) errors.totalCostGMD = 'Cannot be a negative number';

    if(typeof data.unitCostCFA !== 'number') errors.unitCostCFA = 'unitCostCFA should be a number';
    if(data.unitCostCFA < 0) errors.unitCostCFA = 'Cannot be a negative number';

    if(typeof data.totalCostCFA !== 'number') errors.totalCostCFA = 'totalCostCFA should be a number';
    if(data.totalCostCFA < 0) errors.totalCostCFA = 'Cannot be a negative number';

    if(Object.keys(errors).length === 0){
      return {}
    }
    return {errors}
}

export const validateGInfo = (data) =>{
  let errors = {}

  if(data.name.length < 1) errors.name = 'Consignment Name is required';
  if(data.name.length > 100) errors.name = 'Has to be less than 101 Characters';

  if(!isValid(data.date)) errors.date = 'Date is invalid';
  if(data.date.length < 1) errors.date = 'Date is required';

  if(typeof data.conversion !== 'number') errors.conversion = 'Conversion should be a number';
  if(data.conversion < 0) errors.conversion = 'Cannot be a negative number';

  if(data.customPayBag < 0) errors.customPayBag = 'Cannot be a negative number';
  if(typeof data.customPayBag !== 'number') errors.customPayBag = 'Custom should be a number';

  if(data.laborBag < 0) errors.laborBag = 'Cannot be a negative number';
  if(typeof data.laborBag !== 'number') errors.laborBag = 'labor / Bag should be a number';
  
  if(data.transportation < 0) errors.transportation = 'Cannot be a negative number';
  if(typeof data.transportation !== 'number') errors.transportation = 'Transportation should be a number';
  
  if(Object.keys(errors).length === 0){
    return {}
  }
  return {errors}
}

export const validateConversion = (conversion) => {
  if(typeof conversion !== 'number') errors.conversion = 'Conversion should be a number';
  if(conversion < 0) errors.conversion = 'Cannot be a negative number';
  // Only validate the values needed to add an item
}

export const validateTrueCost = (conversion) => {
  // only validate the values needed for the true cost
}