import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectMonsterCard,
  loadMonster,
  isMonsterLoading,
  failedToLoadMonster,
  
} from "../../features/MonsterCardSlice";


// fetch('https://www.dnd5eapi.co/api/monsters/adult-black-dragon')
//   .then(response => response.json())
//   .then(data => console.log(data.name));

const MonsterCard = () => {
  const dispatch = useDispatch();
  const monsterCardContent = useSelector(selectMonsterCard);

  useEffect(() =>{
    // if(monsterCardContent == ""){
      dispatch(loadMonster())
    // }
  })


    return (
        <div>
            {monsterCardContent.monsterContent}
        </div>
    );
}

export default MonsterCard;