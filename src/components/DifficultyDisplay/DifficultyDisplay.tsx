import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { selectEncounterExp } from "../../features/encounterSlice";
import { 
    selectPlayers, 
    changedifficulty, 
    selectEasyThreshhold,
    setEasyThreshhold,
    selectMediumThreshhold,
    setMediumThreshhold,
    selectHardThreshhold,
    setHardThreshhold,
    selectDeadlyThreshhold,
    setDeadlyThreshhold,
    selectEncounterDifficulty,
} from "../../features/playersSlice";
import DifficultyDisplayComp from "./DifficultyDisplayComp";
import { AppDispatch } from "../../app/store";

const DifficultyDisplay = () => {

    const dispatch = useDispatch<AppDispatch>();
    const listOfPlayers = useSelector(selectPlayers)
    const encounterExp = useSelector(selectEncounterExp);
    const easyThresholdXP = useSelector(selectEasyThreshhold);
    const mediumThresholdXP = useSelector(selectMediumThreshhold);
    const hardThresholdXP = useSelector(selectHardThreshhold);
    const deadlyThresholdXP = useSelector(selectDeadlyThreshhold);
    const encounterDifficulty = useSelector(selectEncounterDifficulty);


    useEffect(() => {
        // const calcDifficulty = () => {
        // if (encounterExp !== 0){
 
          const easyThresholds = listOfPlayers.map((player) => player.XPThreshhold.easy);
          const easyValue = 0;
          const calcEasyThreshhold = easyThresholds.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          easyValue
          );
          dispatch(setEasyThreshhold(calcEasyThreshhold))
    
          const mediumThresholds = listOfPlayers.map((player) => player.XPThreshhold.medium);
          const mediumValue = 0;
          const calcMediumThreshhold = mediumThresholds.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          mediumValue
          );
          dispatch(setMediumThreshhold(calcMediumThreshhold))
    
          const hardThresholds = listOfPlayers.map((player) => player.XPThreshhold.hard);
          const hardValue = 0;
          const calcHardThreshhold = hardThresholds.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          hardValue
          );
          dispatch(setHardThreshhold(calcHardThreshhold))
    
          const deadlyThresholds = listOfPlayers.map((player) => player.XPThreshhold.deadly);
          const deadlyValue = 0;
          const calcDeadlyThreshhold = deadlyThresholds.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          deadlyValue
          );
          dispatch(setDeadlyThreshhold(calcDeadlyThreshhold))
    
    
          if (encounterExp === 0) {
              dispatch(changedifficulty('No Monsters'));
          } else if ((encounterExp >= calcEasyThreshhold && encounterExp < calcMediumThreshhold) || encounterExp <= calcEasyThreshhold){
              dispatch(changedifficulty('Easy'));
          } else if (encounterExp >= calcMediumThreshhold && encounterExp < calcHardThreshhold){
              dispatch(changedifficulty('Medium'));
          } else if (encounterExp >= calcHardThreshhold && encounterExp < calcDeadlyThreshhold){
              dispatch(changedifficulty('Hard'));
          } else if (encounterExp >= calcDeadlyThreshhold){
              dispatch(changedifficulty('Deadly'));
          }
        // }
             
        // }
      },[encounterExp,dispatch,listOfPlayers])

    return(
        <DifficultyDisplayComp
            easyThresholdXP={easyThresholdXP}
            mediumThresholdXP={mediumThresholdXP}
            hardThresholdXP={hardThresholdXP}
            deadlyThresholdXP={deadlyThresholdXP}
            encounterDifficulty={encounterDifficulty}
        />
    );
}

export default DifficultyDisplay;