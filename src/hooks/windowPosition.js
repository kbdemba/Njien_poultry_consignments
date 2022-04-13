import { useState, useEffect } from 'react';

export default function useWindowPosition(id, offset=50) {
  const [animation, setAnimation] = useState(false);

  // useLayoutEffect
  useEffect(() => {
    function updatePosition() {
      // if(!id) return;
      if(id==='feature-text'){
        // console.log(window.document.getElementById(id).scrollHeight)

        console.log('')
        console.log(window.pageYOffset)
        console.log(window.innerHeight)
        console.log(window.document.getElementById(id).offsetTop)
        // console.log(window.document.getElementById(id).offsetHeight)
        console.log('')
      }
      const offetSetHeight = window.document.getElementById(id).offsetHeight;
      // console.log( window.document.getElementById(id).scrollHeight, id)
      // console.log(window.pageYOffset, offetSetHeight, id )
      if (window.pageYOffset > offetSetHeight + offset) {
        // setAnimation(true);
      }else{
        // setAnimation(false);
      }
      let windowH = window.pageYOffset; //Scroll y
      let innerH = window.innerHeight; //window height
      let top = window.document.getElementById(id).offsetTop // length bw Biginning of window and element
      let elHeight = window.document.getElementById(id).offsetHeight // height of element div
      // new one
      if(windowH + innerH > (top + offset)){
        setAnimation(true)
        // console.log('setting true', offset)
      }else if(windowH + innerH < (top - 50)){
        setAnimation(false);
      } 
    }
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, [id]);
  return animation;
}
