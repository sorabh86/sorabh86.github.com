import './flexslider.css'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from "react-router-dom"
import $ from "jquery/dist/jquery.slim"

// import '../../Assets/js/touchTouch.jquery-src.js'
// import '../../Assets/js/jquery.flexslider.js'

import Slide1 from "../../Assets/banner/slide-1.jpg"
import Slide2 from "../../Assets/banner/slide-2.jpg"
import Slide3 from "../../Assets/banner/slide-3.jpg"
import Slide4 from "../../Assets/banner/slide-4.jpg"
import Slide5 from "../../Assets/banner/slide-5.jpg"


export default function FlexSlider() {
    const $window = $(window);
    
    function handleOver(e) {
        const $this = $(e.target);
        // const offset = $this.offset();
        if($this.is('img')) {
            const $parent = $this.parent();
            $parent.addClass('active');
            return false;
        }
        console.log('over:', $this[0]);
        $this.addClass('active');
        return false;
    }
    function handleOut(e) {
        var $elements =$(".flexslider .slides li");
        $elements.removeClass('active')
        console.log('out:');
        return false;
    }
    function prevHandle(e) {
        const $list = $('.flexslider .slides li');
        const $cur = $('.flexslider .slides li:visible');
        const size = $list.length;
        let index = $cur.index();
        $cur.hide();
        index = index-1;
        if(index < 0) index = size -1;
        $($list[index]).show();
        return false;
    }
    function nextHandle(e) {
        const $list = $('.flexslider .slides li');
        const $cur = $('.flexslider .slides li:visible');
        const size = $list.length;
        let index = $cur.index();
        $cur.hide();
        index = index+1;
        if(index > size-1) index = 0;
        $($list[index]).show();
        return false;
    }

    $window.on('resize', ()=>{
        removeEvents();
        render();
    });

    function removeEvents() {
        const $sliderList = $(".flexslider .slides li");
        $sliderList.off('mouseenter mouseleave');
        const $prev = $('.flex-prev');
        $prev.off('click');
        const $next = $('.flex-next');
        $next.off('click');
        return {$sliderList, $prev, $next};
    }

    function render() {
        const {$sliderList, $prev, $next} = removeEvents();
        $sliderList.removeAttr('style');
        
        if($window.outerWidth() < 1300) {
            $prev.on('click', prevHandle);
            $next.on('click', nextHandle);
        } else {
            $sliderList.hover(handleOver, handleOut);
        }
        
        console.log($window.outerWidth()+" add events");

        return () => {
            if($window.outerWidth() < 1300) {
                $prev.off('click', prevHandle);
                $next.off('click', nextHandle);
            } else {
                $sliderList.off('hover');
            }
        }
    }

    useEffect(render, []);

  return (
    <div className='sos-flexslider bg-dark text-light p-5'>
        <div className="flexslider">
            <ul className="slides">
                <li> <img src={Slide1} /> </li>
                <li> <img src={Slide2} /> </li>
                <li> <img src={Slide3} /> </li>
                <li> <img src={Slide4} /> </li>
                <li> <img src={Slide5} /> </li> 
            </ul>
            <ul className="flex-control-nav flex-direction-nav">
                <li><a className="flex-prev" href="#"><span className="fa fa-chevron-left"></span></a></li>
                <li><a className="flex-next" href="#"><span className="fa fa-chevron-right"></span></a></li>
            </ul>
        </div>
        <div className="slogan d-flex">
            <div className='slogan-head'>
                <h2 className="slogan-heading sos-text">Full Stack Developer</h2>
            </div>
            <div className='slogan-text p-4 pb-1'>
                <div className='text-start'>
                    <b className='text-blue fs-4'>Who is an Fulll Stack Developer?</b> <br />
                    A Person expertise with both Fronthand & Backhand, He can work on any phase of software development lifecycle. Person who have depth understanding and experience about all Processes(Activities, Events), all those phases of development of system. <br />
                    Overall process of Software Development Lifecycle(SDLC), there are numerous Process of development Model used in the industry, most commonly used are, Water Fall Model, Prototype Model, Sprial Model, Agile Model, etc. <br /><br />
                    Here are commonly used stages: 
                    <ul className='pt-3'>
                        <li><b className='text-blue'>Requirement Gathering & Analysis:</b> Gathering information about business, then information is converted<i>(Problem Statement's)</i> into Functional Statement's, then define limitations, then generate a Requirement Document.</li>
                        <li><b className='text-blue'>Design:</b> Take input from SRS document and turn distribute them into different module of functionality using various diagrams(DFD, ER, usecase, class diagrams, etc) and mockups, generate a Software Design(SD) Document</li>
                        <li><b className='text-blue'>Code:</b> Software Design Document is going to be base of coding functionality.</li>
                        <li><b className='text-blue'>Testing:</b> Based on Design Document, we wrote different testing cases for unit, integration, system testing.</li>
                        <li><b className='text-blue'>Deployment:</b> We deliver relative documentation and setup software system on client machine.</li>
                        <li><b className='text-blue'>Training: </b> <small className='bg-secondary rounded ps-1 pe-1'>(not manditory, as per request)</small> We provide our client training about, How to use our system.</li>
                        <li><b className='text-blue'>Maintenance: </b> <small className='bg-secondary rounded ps-1 pe-1'>(not manditory, as per request)</small> This include system optimization, bug fixes, etc.</li>
                    </ul>  
                </div>
                {/* <p>Web design process always begins with the team's involvement in scoping and prioritizing elements of the project. The designer is also responsible for bringing the pages to life using the wireframes created to mock up each page.  Content is such an important part of your website, but it doesn’t always get the attention that it deserves. This template is designed and developed over the Bootstrap frontend framework. Which is a free front-end framework for designers. Template is fully <i>responsive</i> and <i>compatible</i> with all the major browsers.</p> */}
                <Link to="/contact" className="mt-3 btn btn-primary sos-bg">Contact Us</Link>
            </div>
        </div>
    </div>
  )
}
