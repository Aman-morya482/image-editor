import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { userContext } from '../utils/ContextProvider';


const HomeRating = ({ open }) => {

    const [rating, setRating] = useState({});
    const { user, url } = useContext(userContext)

    const fetchRating = async () => {
        try {
            const response = await fetch(`${url}/rating/get`, {
                method: 'GET'
            })
            const data = await response.json()
            console.log(data);
            setRating(data)
        } catch (error) {
            console.log("rating fetching error", error)
        }
    }

    useEffect(() => {
        fetchRating();
    }, [])

    return (
        <div className='relative w-full max-w-[1800px] text-white bg-gradient-to-bl from-black/60 via-black/80 to-black p-10 md:p-16'>
            <p className='text-center text-4xl font-bold mb-12'>Loved by Our Users !!</p>
            <div className='flex flex-wrap justify-center gap-x-10 gap-y-10 px-14'>
                <div className='flex flex-col min-h-[240px] gap-1 border border-white/70 bg-white/10 hover:bg-white/20 hover:scale-102 transition-all ease-linear rounded-md px-4 pt-4 w-[400px]'>
                    <div className='flex items-center gap-2'><span className='py-[4px] px-[12px] font-bold text-xl bg-gradient-to-br from-white to-white/40 text-black rounded-full'>A</span><p className='text-lg font-semibold'>Aman Mourya</p></div>
                    <div className='text-2xl'>⭐⭐⭐⭐</div>
                    <div className='text-white text-sm'>Pixelo's image tools are intuitive and powerful! The AI enhancements saved me tons of time.</div>
                    <div className='text-white/70'>@Mumbai</div>
                </div>
                <div className='flex flex-col min-h-[240px] gap-1 border border-white/70 bg-white/10 hover:bg-white/20 hover:scale-102 transition-all ease-linear rounded-md px-4 pt-4 w-[400px]'>
                    <div className='flex items-center gap-2'><span className='py-[4px] px-[12px] font-bold text-xl bg-gradient-to-br from-white to-white/40 text-black rounded-full'>R</span><p className='text-lg text-white/90 font-semibold'>Anil Kushwaha</p></div>
                    <div className='text-2xl'>⭐⭐⭐⭐⭐</div>
                    <div className='text-white text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis magnam eius incidunt saepe totam nobis!</div>
                    <div className='text-white/70'>@Dehli</div>
                </div>
                <div className='flex flex-col min-h-[240px] gap-1 border border-white/70 bg-white/10 hover:bg-white/20 hover:scale-102 transition-all ease-linear rounded-md px-4 pt-4 w-[400px]'>
                    <div className='flex items-center gap-2'><span className='py-[4px] px-[12px] font-bold text-xl bg-gradient-to-br from-white to-white/40 text-black rounded-full'>P</span><p className='text-lg text-white/90 font-semibold'>Pappu Bhagat</p></div>
                    <div className='text-2xl'>⭐⭐⭐</div>
                    <div className='text-white text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque veniam non recusandae ad repudiandae eveniet voluptas, ab nulla quis cum ratione assumenda, magnam in nesciunt fugiat ut perferendis!</div>
                    <div className='text-white/70'>@Pune</div>
                </div>
                <div className='flex flex-col min-h-[240px] gap-1 border border-white/70 bg-white/10 hover:bg-white/20 hover:scale-102 transition-all ease-linear rounded-md px-4 pt-4 w-[400px]'>
                    <div className='flex items-center gap-2'><span className='py-[4px] px-[12px] font-bold text-xl bg-gradient-to-br from-white to-white/40 text-black rounded-full'>A</span><p className='text-lg text-white/90 font-semibold'>Aman Mourya</p></div>
                    <div className='text-2xl'>⭐⭐⭐⭐</div>
                    <div className='text-white text-sm'>Pixelo's image tools are intuitive and powerful! The AI enhancements saved me tons of time.</div>
                    <div className='text-white/70'>@Mumbai</div>
                </div>
                <div className='flex flex-col min-h-[240px] gap-1 border border-white/70 bg-white/10 hover:bg-white/20 hover:scale-102 transition-all ease-linear rounded-md px-4 pt-4 w-[400px]'>
                    <div className='flex items-center gap-2'><span className='py-[4px] px-[12px] font-bold text-xl bg-gradient-to-br from-white to-white/40 text-black rounded-full'>R</span><p className='text-lg text-white/90 font-semibold'>Anil Kushwaha</p></div>
                    <div className='text-2xl'>⭐⭐⭐⭐</div>
                    <div className='text-white text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, odio nihil? Cum, laborum. Iusto, aliquid voluptatibus!</div>
                    <div className='text-white/70'>@Dehli</div>
                </div>
                <div className='flex flex-col min-h-[240px] gap-1 border border-white/70 bg-white/10 hover:bg-white/20 hover:scale-102  transition-all ease-linear rounded-md px-4 pt-4 w-[400px]'>
                    <div className='flex items-center gap-2'><span className='py-[4px] px-[12px] font-bold text-xl bg-gradient-to-br from-white to-white/40 text-black rounded-full'>P</span><p className='text-lg text-white/90 font-semibold'>Pappu Bhagat</p></div>
                    <div className='text-2xl'>⭐⭐⭐⭐⭐</div>
                    <div className='text-white text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
                    <div className='text-white/70'>@Pune</div>
                </div>
            </div>
            <div className='w-full flex justify-end cursor-pointer mt-4 px-14'>
                <NavLink to="/user-rating" className='underline text-blue-500'>See more reviews</NavLink>
            </div>
            <div className='w-full flex justify-center mt-8'>
                <button onClick={() => open(true)} className='bg-white/90 hover:bg-white text-black px-14 py-3 rounded-full text-2xl font-semibold cursor-pointer ring-white/40 hover:ring-4 hover:scale-102 transition-all ease-linear'>{`Add Your Review >`}</button>
            </div>
        </div>
    )
}

export default HomeRating
