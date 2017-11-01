import  React ,{Component} from  "react"
import Swiper from 'react-id-swiper';

import Kegitan from "../card/kegiatan"


export default class Slide extends Component{
    
    render(){
        
        const params = {
            pagination: '.swiper-pagination',
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 30
        };

        let item  =   this.props.kegiatan
       
        item = item.map((data ,index)=>{
            return(
                 <div className="br2 ba dark-gray b--black-10 mv4 w-30 fl" style={{height:"320px"}}>
                 <Kegitan kegiatan={data} key={index}/>
                 </div>
            
            )
        })

        return(
            /*<Swiper  
                pagination={params.pagination}
                paginationClickable={params.paginationClickable}
                slidesPerView={params.slidesPerView}
                nextButton={params.nextButton}
                prevButton={params.prevButton}
                spaceBetween={params.spaceBetween}
                >*/
            <div className="fl w-100 pa2" > 
                {item}
           </div> 
        )
    }
}