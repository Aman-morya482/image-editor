import React, { useEffect } from 'react'

const MovingBall = () => {

    const ballRef = useRef(null);
       
    useEffect(()=>{
    const ball = ballRef.current;
    if (!ball) return;
    const { top, left, width, height } = ball.getBoundingClientRect();
    const initialX = left + width / 2;
    const initialY = top + height / 2;

    function springToPointer() {
      animate(
        ball,
        {
          x: pointerX.get() - initialX,
          y: pointerY.get() - initialY,
        },
        { type: "spring", stiffness: 100, damping: 10 }
      );
    }

    function scheduleSpringToPointer() {
      frame.postRender(springToPointer);
    }

    pointerX.on("change", scheduleSpringToPointer);
    pointerY.on("change", scheduleSpringToPointer);

    const handleMouseMove = (e) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };

    return () => window.addEventListener("pointermove", handleMouseMove)
},[]);


  return (
    <div>
            <div ref={ballRef} className='z-[-1] w-[50px] h-[50px] bg-blue-600 hidden md:block absolute rounded-[50%]'></div>
    </div>
  )
}

export default MovingBall
