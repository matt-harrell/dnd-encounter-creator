import { useSelector } from "react-redux";
import {
  selectMonsterCard,
  showMonsterCard,  
} from "../../features/MonsterCardSlice";
import { Grid,Typography,Box } from "@mui/material";


interface profType {
  value:number,
  proficiency:{
    index:string,
    name:string,
    url:string
  }
}

interface abilityType{
  name:string;
  desc:string;
  usage?:{
    rest_types:string[];
    type:string;
    times:number;
  }
}

interface actionType{
  name:string;
  desc:string;
  usage?:{
    rest_types?:string[];
    type?:string;
    times?:number;
    min_value?:number;
    dice?:string;
  }
}


const MonsterCard = () => {
  const monster = useSelector(selectMonsterCard);
  const {
          name,
          size,
          type,
          alignment,
          armor_class,
          hit_points,
          hit_dice,
          speedString,
          statMods,
          savingThrows,
          skills,
          damage_vulnerabilities,
          damage_resistances,
          condition_immunities,
          senses,
          senseString,
          languages,
          challenge_rating,
          xp,
          special_abilities,
          actions,
          reactions,
          legendary_actions,

        } = monster;
  const showMonster = useSelector(showMonsterCard);    

    return (
      <div>
        {showMonster && (
        <Box>
            <Typography component={'h2'} variant={'h3'}>{name}</Typography>
            <Typography component={'p'} variant={'body1'}>{size}, {type}, {alignment}</Typography>
            <hr />
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{textAlign:'left'}}>
            
            <Box>
              <Typography component={'p'} variant={'body1'}>Armor Class:{armor_class}</Typography>
              <Typography component={'p'} variant={'body1'}>Hit Points:{hit_points} ({hit_dice})</Typography>
              <Typography>Speed:{speedString}</Typography>
            </Box>
            <hr />
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography>STR</Typography>
                <Typography>{statMods[0]}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>DEX</Typography>
                <Typography>{statMods[1]}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>CON</Typography>
                <Typography>{statMods[2]}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>INT</Typography>
                <Typography>{statMods[3]}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>WIS</Typography>
                <Typography>{statMods[4]}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>CHA</Typography>
                <Typography>{statMods[5]}</Typography>
              </Grid>              
            </Grid>
            <hr />
            <Box>
              {savingThrows.length !== 0 && (
                <Typography>
                  Saving Throws:
                  {savingThrows.map((prof:profType,index:number) => {
                    if(index === savingThrows.length - 1) {
                      return <Typography component={'span'} key={index}>{prof.proficiency.name.replace('Saving Throw: ','')} +{prof.value}</Typography>
                    } else {
                      return <Typography component={'span'} key={index}>{prof.proficiency.name.replace('Saving Throw: ','')} +{prof.value}, </Typography>
                    }    
                  })}
                </Typography>
              )}
              {skills.length !== 0 && (
                <Typography>
                  Skills:
                  {skills.map((prof:profType,index:number) => {
                    if(index === skills.length - 1) {
                      return <Typography component={'span'} key={index}>{prof.proficiency.name.replace('Skill: ','')} +{prof.value}</Typography>
                    } else {
                      return <Typography component={'span'} key={index}>{prof.proficiency.name.replace('Skill: ','')} +{prof.value}, </Typography>
                    }    
                  })}
                </Typography>
              )}
              {damage_vulnerabilities.length !== 0 && (
                <Typography>
                  Damage Vulnerabilities:
                  {damage_vulnerabilities.map((dam:string,index:number) => {
                    if(index === damage_vulnerabilities.length - 1) {
                      return <Typography component={'span'} key={index}>{dam}</Typography>
                    } else {
                      return <Typography component={'span'} key={index}>{dam}, </Typography>
                    }    
                  })}
                </Typography>
              )}
              {damage_resistances.length !== 0 && (
                <Typography>
                  Damage Resistances:
                  {damage_resistances.map((dam:string,index:number) => {
                    if(index === damage_resistances.length - 1) {
                      return <Typography component={'span'} key={index}>{dam}</Typography>
                    } else {
                      return <Typography component={'span'} key={index}>{dam}, </Typography>
                    }    
                  })}
                </Typography>
              )}
              {condition_immunities.length !== 0 && (
                <Typography>
                  Condition Immunities:
                  {condition_immunities.map((con:{name:string},index:number) => {
                    if(index === condition_immunities.length - 1) {
                      return <Typography component={'span'} key={index}>{con.name}</Typography>
                    } else {
                      return <Typography component={'span'} key={index}>{con.name}, </Typography>
                    }    
                  })}
                </Typography>
              )}
              {Object.values(senses).length !== 0 && (
                <Typography>Senses:{senseString}</Typography>
              )}
              <Typography>Languages:{languages}</Typography>
              <Typography>Challege Rating:{challenge_rating} ({xp} XP)</Typography>
                   
             
            </Box>
            <hr />
            <Box>
            {special_abilities.length !== 0 && (
                <Box>
                  {special_abilities.map((ability:abilityType,index:number) => {
                    if(ability.usage === undefined) {
                      return <Typography component={'p'} key={index}><b>{ability.name}:</b> {ability.desc}</Typography>
                    } else{
                      switch (ability.usage.type) {
                        case 'per day':
                          return <Typography component={'p'} key={index}><b>{ability.name} ({ability.usage.times} {ability.usage.type}):</b> {ability.desc}</Typography>
                        case 'at will':
                          return <Typography component={'p'} key={index}><b>{ability.name} ({ability.usage.type}):</b>{ability.desc}</Typography>
                        case 'recharge after rest':
                          return <Typography component={'p'} key={index}><b>{ability.name} ({ability.usage.type}):</b>{ability.desc}</Typography>
                        case 'recharge on roll':
                          return <Typography component={'p'} key={index}><b>{ability.name} ({ability.usage.type} {ability.usage.times}):</b> {ability.desc}</Typography>
                        default:                          
                          return null;
                      }
                    }     
                  })}
                </Box>
              )}
            </Box>

          </Grid>
          <Grid item xs={12} sm={6} sx={{textAlign:'left'}}>
            <Box>
            {actions.length !== 0 && (
                <Box>
                  <Typography component={'h2'} variant={'h3'}>Actions</Typography>
                  {actions.map((action:actionType,index:number) => {
                    if(action.usage === undefined){
                      return <Typography component={'p'} key={index}><b>{action.name}:</b> {action.desc}</Typography>
                    } else{
                      switch (action.usage.type) {
                        case 'recharge on roll':
                          return <Typography component={'p'} key={index}><b>{action.name} ({action.usage.type} of at least {action.usage.min_value}({action.usage.dice})):</b> {action.desc}</Typography>
                        case 'per day':
                          return <Typography component={'p'} key={index}><b>{action.name} ({action.usage.times} {action.usage.type}):</b> {action.desc}</Typography>
                        case 'at will':
                          return <Typography component={'p'} key={index}><b>{action.name} ({action.usage.type}):</b>{action.desc}</Typography>
                        case 'recharge after rest':
                          return <Typography component={'p'} key={index}><b>{action.name} ({action.usage.type}):</b>{action.desc}</Typography>
                        default:                          
                          return null;
                      }
                       
                    }     
                  })}
                   <hr/>
                </Box> 
              )}
            {reactions.length !== 0 && (
                <Box>
                  <Typography component={'h2'} variant={'h3'}>Reactions</Typography>
                  {reactions.map((action:{name:string,desc:string},index:number) => (
                    <Typography component={'p'} key={index}><b>{action.name}:</b> {action.desc}</Typography>      
                  ))}
                   <hr/>
                </Box> 
              )}
            {legendary_actions.length !== 0 && (
                <Box>
                  <Typography component={'h2'} variant={'h3'}>Legendary Actions</Typography>
                  <Typography component={'p'} sx={{paddingY:2}}>
                    {name} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature’s turn. {name} regains spent legendary actions at the start of their turn.
                  </Typography>
                  {legendary_actions.map((action:{name:string,desc:string},index:number) => (
                    <Typography component={'p'} key={index}><b>{action.name}:</b> {action.desc}</Typography>      
                  ))}
                   <hr/>
                </Box> 
              )}
            </Box>
          </Grid>
        </Grid>
        </Box>
        )}
      </div>
      
     
        
        
    );
}

export default MonsterCard;