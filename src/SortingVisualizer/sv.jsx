import { render } from '@testing-library/react';
import React from 'react'; 
import './sv.css'; 
import {getAnimations} from '../sortingAlgs/sortingAlgs.js';

//global consts 
const ANIMATION_SPEED_MS = 1;

const PRIMARY_COLOR = 'skyblue';
const SECOND_COLOR = 'red';
const height = window.screen.availHeight * 0.8;
const width = window.screen.availWidth * 0.8;

const ARRAY_BARS = width /4;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

//when app loadds for the first time, we reset the array
    //compoents are JS objects/functions -- accept arbitrary inputs called props -- return
    //react elements as to what should be shown on screen 
    componentDidMount(){
        this.resetArray();
    }
//@resetArray: creates array with random integers accoring to the specified bars 
    resetArray(){
        const array = [];
        for(let i = 0; i < ARRAY_BARS; i++) {
            array.push(randomGenerator(5,height));
        }
        this.setState({array});
    
    }
    mergeSort(){
        const animations = getAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++){
            //search in CSS file to get HTML elements named bar 
            const bars = document.getElementsByClassName('bar');
            //since every third thing on animations bar is a new comparison 
            const isColorChange = (i % 3) !== 2;
            if(isColorChange){
                const [barOneIdx,barTwoIdx] = animations[i];
                const barOneStyle = bars[barOneIdx].style;
                const barTwoStyle = bars[barTwoIdx].style;
                const color = (i % 3) ===0? SECOND_COLOR: PRIMARY_COLOR;
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color;
                    barTwoStyle. backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else{
                setTimeout(()=>{
                    const [barOneIdx,newHeight] = animations[i];
                    const barOneStyle = bars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i* ANIMATION_SPEED_MS);
            }
        }
    }

    // testSorting(){
    //     //test 100 times 
    //     for(let i = 0;i<100;i++){
    //         //generate arrays of arbitrary length 
    //         const arr = [];
    //         const size = randomGenerator(1,1000);
    //         //populate with random numbers
    //         for(let j=0; j<size;j++){
    //             arr.push(randomGenerator(-2000,2000));
    //         }
    //         //validate 
    //         const jsSorted = arr.slice().sort((a,b)=> a-b);
    //         const myArr = mergeSort(arr.slice());
    //         console.log(arraysAreEqual(jsSorted, myArr));
    //     }
    // }
    

    render(){
        const {array} = this.state;


        return (
            <div className = "container">
                {array.map((value, idx) => (
                <div className= "bar" key ={idx}
                style={{backgroundColor: PRIMARY_COLOR,
                    height: `${value}px`}}
                >
                </div>                
            ))}
            <div className = 'button'>
            <button variant="primary" onClick ={() => this.resetArray()}>Make Random Numbers!</button>
            <button variant="primary"  onClick ={()=> this.mergeSort()}> Mergesort</button>
            <button variant = "primary"  onClick ={()=> this.testSorting()}>Test Sorting</button>
            </div>

            </div>
            

            
        );
            
    }
}
//reference: https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
function randomGenerator(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function arraysAreEqual(arr1,arr2){
    if(arr1.length != arr2.length){
        return false;
    }
    for(let i = 0; i<arr1.length; i++){
        if(arr1[i] != arr2[i]){
            return false;
        }
    }
    return true;
}
