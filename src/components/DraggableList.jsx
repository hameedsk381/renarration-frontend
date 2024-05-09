import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Typography } from '@mui/material';
import MyComponent from './Mycomponent';
import RenarrationBlock from './RenarrationBlock';
import { updateAnnotatedBlock } from '../redux/actions/annotationActions';

function DraggableList({annotatedBlocks}) {
 const constraintsRef = useRef(null);
//  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
 const parentPosition = useSelector((state) => state.drag.parentPosition);
 const dispatch = useDispatch();

 useEffect(() => {
   const handleParentPosition = () => {
     const rect = constraintsRef.current.getBoundingClientRect();
     dispatch({ type: 'UPDATE_PARENT_POSITION', payload: { x: rect.x, y: rect.y } });
   };

   window.addEventListener('resize', handleParentPosition);
   handleParentPosition();

   return () => {
     window.removeEventListener('resize', handleParentPosition);
   };
 }, [dispatch]);

 const handleDragEnd = (event, info,id) => {
   const { x, y } = info.offset;
   const existingBlock = 
   annotatedBlocks.find((block) => block.target.id === id);
   const updatedBlock = {
    ...existingBlock,position:{
      x: x - parentPosition.x, y: y - parentPosition.y
    }
   }
   dispatch(updateAnnotatedBlock(id, updatedBlock));
  //  dispatch({
  //    type: 'UPDATE_ITEM_POSITION',
  //    payload: { id: info.id, x: x - parentPosition.x, y: y - parentPosition.y },
  //  });
 };
// const items = Array.from({ length: 18 }, (_, index) => ({
//   id: index + 1,
//   subtitle: `Subtitle ${index + 1}`,
//   title: `Title ${index + 1}`,
//   description: `Description ${index + 1}`,
// }));
  
  // const [isLoading, setIsLoading] = useState(true);
  
  // // Simulating data fetching
  // setTimeout(() => {
  //   setIsLoading(false);
  // }, 2000);
  
  return (
   <motion.div
     className="container"
     ref={constraintsRef}
     style={{
       width: '50vw',
       height: '50vh',
      
       background: 'red',
     }}
   >
     {annotatedBlocks.map((block) => (
       <motion.div
         key={block.target.id}
         className="item"
         drag
         dragConstraints={constraintsRef}
         dragElastic={0.2}
         onDragEnd={(event, info) => handleDragEnd(event, { ...info},block.target.id)}
         style={{
           width: '100px',
           height: '100px',
           background: 'white',
           borderRadius: 'inherit',
           transform: `translate(${block.position.x + parentPosition.x}px, ${block.position.y + parentPosition.y}px)`,
         }}
         dragMomentum={false}
         dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
       >
          <RenarrationBlock block={block}/>
       </motion.div>
     ))}
   </motion.div>

  )
}

export default DraggableList;