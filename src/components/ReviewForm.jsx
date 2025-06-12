import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import '../App.css'
import { toast } from 'react-toastify';
import { userContext } from '../utils/ContextProvider';

const ReviewForm = ({ open }) => {

    const [rating, setRating] = useState(5);
    const [summary, setSummary] = useState("");
    const [location, setLocation] = useState("");
    const [star, setStar] = useState([]);
    const { url, user } = useContext(userContext);

    useEffect(() => {
        if (open) { document.body.style.overflow = "hidden" }
        else { document.body.style.overflow = "auto" }
        return () => { document.body.style.overflow = "auto" }
    }, [open])

    const getStarArray = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(1);       // Full star
            } else if (rating == (i - 0.5)) {
                stars.push(0.5);     // Half star
            } else {
                stars.push(0);       // Empty star
            }
        }
        return stars;
    }

    useEffect(() => {
        const data = getStarArray(rating)
        setStar(data);
    }, [rating])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (summary.length == 0) return toast.info("Please write summary")
        if (location.length == 0) return toast.info("Please enter your location")
        const payload = { rating: rating, summary: summary, location: location }
        try {
            const response = await fetch(`${url}/review/save?email=${user.value.email}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.value.token}` },
                body: payload
            })
            if (response) toast.success("Thanks for rating us 😊 !!")
        } catch (error) {
            toast.error("Something went wrong !!")
            console.log("rating error", error);
        } finally { open(false) }
    }

    return (
        <div className='fixed inset-0 z-100 flex justify-center items-center bg-black/70'>
            <div className='h-[600px] rounded-xl text-white w-xl bg-[#2f2f2f] flex flex-col py-8 px-4'>
                <p className='text-center text-3xl font-semibold'>-- Add Rating --</p>
                <form onSubmit={handleSubmit} className='px-10 mt-8 flex flex-col gap-4 review-range'>
                    <div className='flex justify-center text-6xl'>
                        {
                            star.map((num, ind) => {
                                return num == 1 ? <FaStar fill='yellow' /> : num == 0.5 ? <FaStarHalfStroke fill='yellow' /> : <FaRegStar fill='gray' />
                            })
                        }
                    </div>
                    <p className='text-center font-semibold text-2xl'>{rating}</p>
                    <input type="range" title='Slide to change rating' className='' value={rating} onChange={e => setRating(e.target.value)} min={1} max={5} step={0.5} name="" id="" />
                    <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className='p-3 border outline-none rounded-xl w-full text-sm min-h-[110px] max-h-[110px]' maxLength={200} placeholder='Review Summary' />
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className='border outline-none text-sm rounded-xl p-3 w-full capitalize' placeholder='Your City Name' />
                    <button type="submit" className='bg-white/90 hover:bg-white text-black px-14 py-3 rounded-full text-xl font-semibold cursor-pointer ring-white/40 hover:ring-3'>Submit Review</button>
                    <button onClick={() => open(false)} className='border-white text-center border-2 px-14 py-3 rounded-full text-xl font-semibold cursor-pointer ring-white/40 hover:ring-3'>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm
