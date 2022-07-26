import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectMonsterCard,
  loadMonster,
  isMonsterLoading,
  failedToLoadMonster,
  
} from "../../features/MonsterCardSlice";
import { AppDispatch } from "../../app/store";


// fetch('https://www.dnd5eapi.co/api/monsters/adult-black-dragon')
//   .then(response => response.json())
//   .then(data => console.log(data.name));

const MonsterCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const monsterCardContent = useSelector(selectMonsterCard);

  


    return (
        <div>
            <div>{monsterCardContent.name}</div>
            <div>{monsterCardContent.alignment}</div>
        </div>
    );
}

export default MonsterCard;