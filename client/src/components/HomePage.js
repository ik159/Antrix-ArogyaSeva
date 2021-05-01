import React from 'react'
import CardComponent from './CardComponent';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';
const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        justifyItems: "center"
      }
      
}));

export default function HomePage() {
    const classes = useStyles();
    
    

  const cardsDetail = [
      {
          "desc" : "check for beds",
          "img"  : "https://www.jing.fm/clipimg/detail/35-354738_hospital-clipart-hospital-stay-bed-hospital-vector.png"
      },
      {
        "desc" : "Medicines",
        "img"  : "https://img.freepik.com/free-vector/medicine-pharmacy_131590-145.jpg?size=626&ext=jpg"
    },
    {
        "desc" : "Plasma Donors",
        "img"  : "https://thumbs.dreamstime.com/b/blood-donation-24320409.jpg"
    },
    {
        "desc" : "Volunteering",
        "img"  : "https://img.freepik.com/free-vector/young-volunteering-enthusiasts-composition_1284-18827.jpg?size=626&ext=jpg"
    },
    {
      "desc" : "Oxygen",
      "img"  : "https://media1.thehungryjpeg.com/thumbs2/ori_3888514_phi9rbsl30raggykw3658mnwvuujgdlxxr57fkib_medical-oxygen-vector-black-illustrations.jpg"
  },
  {
    "desc" : "News Feed",
    "img"  : "https://img.freepik.com/free-vector/news-concept-landing-page_52683-20522.jpg?size=626&ext=jpg"
},
  ];

    return (
        <div>
           
      <div className={classes.wrapper} >
      {cardsDetail.map ((cards , index) => {
          return (
            <CardComponent name={cards.desc} img={cards.img} index={index}/>
          );
      })}
      </div>
      
        </div>
    )
}
