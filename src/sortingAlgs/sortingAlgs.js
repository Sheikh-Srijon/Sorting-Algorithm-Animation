//export const mergeSort = array => {
export function getAnimations(array){
    const animations = [];
    if(array.length ==1) return array;
    else{
        const auxArr = array.slice();
        const last_idx = array.length -1 ;
        msHelper(array, 0, last_idx, auxArr, animations);
        return animations;
    }
}

function msHelper(array, start_idx,last_idx, auxArr,animations){
    //array of 1 element
    if(start_idx === last_idx) {
        return;
    }
    else{
    
    const mid = Math.floor((start_idx + last_idx)/2);
    msHelper(auxArr, start_idx, mid, array, animations);
    msHelper(auxArr, mid+1, last_idx,array,animations);
    merge(array, start_idx,mid, last_idx, auxArr,animations);
    }
}

function merge(array, start_idx,mid,last_idx, auxArr,animations){
    let j = mid + 1;
    let i = start_idx;
    let k = start_idx;
    
    
    while(i<=  mid && j<=last_idx){
        animations.push([i,j]);//push values being compared to change color
        animations.push([i,j]);//push values being compared to REVERT color 


        if(auxArr[i]<=auxArr[j]){
            animations.push([k, auxArr[i]])
            array[k++] = auxArr[i++];
        }
        else{
            animations.push([k, auxArr[j]]);
            array[k++] = auxArr[j++];
        }
       
    }
    //add any leftovers
    while(i <= mid){
        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([k,auxArr[i]]);
        array[k++] = auxArr[i++];
    }

    while(j <= last_idx){
        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([k, auxArr[j]]);
        array[k++] = auxArr[j++];
    }
}



