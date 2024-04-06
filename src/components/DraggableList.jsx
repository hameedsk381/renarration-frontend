import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Typography } from '@mui/material';
import MyComponent from './Mycomponent';

function DraggableList() {
//   const constraintsRef = useRef(null);
//   const parentPosition = useSelector((state) => state.drag.parentPosition);
//   const itemPositions = useSelector((state) => state.drag.itemPositions);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const handleParentPosition = () => {
//       const rect = constraintsRef.current.getBoundingClientRect();
//       dispatch({ type: 'UPDATE_PARENT_POSITION', payload: { x: rect.x, y: rect.y } });
//     };

//     window.addEventListener('resize', handleParentPosition);
//     handleParentPosition();

//     return () => {
//       window.removeEventListener('resize', handleParentPosition);
//     };
//   }, [dispatch]);

//   const handleDragEnd = (event, info) => {
//     const { x, y } = info.offset;
//     dispatch({
//       type: 'UPDATE_ITEM_POSITION',
//       payload: { id: info.id, x: x - parentPosition.x, y: y - parentPosition.y },
//     });
//   };
const items = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  subtitle: `Subtitle ${index + 1}`,
  title: `Title ${index + 1}`,
  description: `Description ${index + 1}`,
}));
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulating data fetching
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  
  return (
//     <motion.div
//       className="container"
//       ref={constraintsRef}
//       style={{
//         width: '50vw',
//         height: '50vh',
//         display: 'flex',
//         placeContent: 'center',
//         placeItems: 'center',
//         overflow: 'hidden',
//         background: 'red',
//       }}
//     >
//       {Object.entries(itemPositions).map(([id, position]) => (
//         <motion.div
//           key={id}
//           className="item"
//           drag
//           dragConstraints={constraintsRef}
//           dragElastic={0.2}
//           onDragEnd={(event, info) => handleDragEnd(event, { ...info, id })}
//           style={{
//             width: '100px',
//             height: '100px',
//             background: 'white',
//             borderRadius: 'inherit',
//             transform: `translate(${position.x + parentPosition.x}px, ${position.y + parentPosition.y}px)`,
//           }}
//           dragMomentum={false}
//           dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
//         >
//             <Box>
// <Typography>hii</Typography>
//             </Box>
//         </motion.div>
//       ))}
//     </motion.div>
<>

<Container sx={{bgcolor:'Highlight',width:'100%',height:'100vh',justifyContent:'center',alignItems:'center',display:'flex'}}>
    <MyComponent items={items} isLoading={isLoading} />
  </Container>
</>
  )
}

export default DraggableList;