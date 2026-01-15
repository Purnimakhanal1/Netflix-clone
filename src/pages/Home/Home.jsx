import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import herobanner from '../../assets/herobanner.jpg'
import {Play,Info} from "lucide-react";
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

 const Home = () => {
  return (
    <div className='home'>
<Navbar/>
<div className="hero">
  <img src={herobanner} alt="banner-img" />
  <div className="hero-caption">
  <p>Trapped in a high school overrun by zombies, a group of students must fight for survival against all odds. All of Us Are Dead is a heart-pounding, emotional journey through the apocalypse. Will they escape, or will they become the next victim?</p>
  <div className="hero-btns">
    <button className='btn'>
      <Play className="btnicon"/>Play</button>
    <button className='btn dark-btn'>
      <Info className="btnicon"/>More</button>
  </div>
  <TitleCards/>
  </div>
</div>
<div className='more-cards'>
<TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
<TitleCards title={"Popular"} category={"popular"}/> 
<TitleCards title={"Upcoming"} category={"upcoming"}/> 
<TitleCards title={"Top Pics for You"} category={"now_playing"}/>
</div>
<Footer/>
    </div>
  )
}

export default Home; 