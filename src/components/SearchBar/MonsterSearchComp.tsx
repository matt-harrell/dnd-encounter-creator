
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box,Button,FormControl,Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';


interface MonsterSearchCompProps{
  searchedMonster:string | null;
  inputValue:string;
  cRInpit:string;
  options:string[];
  open:boolean;
  loading:boolean
  handleChange:(e: any,searchedMonster: string | null) => void;
  handleAddMonsterClick: () => void;
  handleCRChange:(event: SelectChangeEvent) => void;
  handleOpen:() => void;
  handleClose:() => void;
  handleInputChange:(newInputValue:string) => void;
}


const challegeRatingsList = ['any',0,0.125,0.25,0.5,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

const MonsterSearchComp = ({searchedMonster,cRInpit,options,open,loading,handleChange,handleAddMonsterClick,handleCRChange,handleOpen,handleClose,handleInputChange,inputValue}:MonsterSearchCompProps) => {      

    return (
      <Box sx={{paddingX:1, marginY:5}}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Autocomplete
              open={open}
              onOpen={handleOpen}
              onClose={handleClose}
              loading={loading}
              value={searchedMonster}
              onChange={handleChange}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                handleInputChange(newInputValue);
              }}
              options={options}
              sx={{ width: '100%', marginX: 'auto', marginBottom: 2, bgcolor: 'white', padding: .3, borderRadius: 1 }}
              renderInput={(params) => <TextField variant='standard' {...params} label="Monster" />}
            />
          </Grid>
          <Grid item xs={4}>
              <FormControl sx={{width:'100%'}}>
                  <InputLabel id="challegeRating">CR</InputLabel>
                  <Select
                      labelId="challegeRating"
                      id="challegeRatingSelect"
                      value={cRInpit}
                      label="CR"
                      onChange={handleCRChange}
                      sx={{bgcolor:'white',borderRadius:1}}
                  >   
                      {challegeRatingsList.map((CR:number | string,index:number) => <MenuItem key={index} value={CR}>{CR}</MenuItem> )} 
                  </Select>
              </FormControl>
          </Grid>
        </Grid>
        
        <Button variant="contained" color='danger' disableElevation onClick={handleAddMonsterClick}>
          Add Monster
        </Button>
      </Box>
      
    );
  }

export default MonsterSearchComp;