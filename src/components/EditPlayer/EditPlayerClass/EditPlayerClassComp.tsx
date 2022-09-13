import { Autocomplete, FilterOptionsState, TextField } from "@mui/material";

interface EditPlayerClassCompProps {
    open:boolean;
    loading:boolean;
    playerClass:string;
    handleChange:(e: any, searchClass: string | null) => void;
    handleInputChange:(e: any, newInputValue: string) => void;
    toggleOpen:() => void
    inputValue:string;
    options:string[];
    filter:(options: string[], state: FilterOptionsState<string>) => string[];
    
}

const EditPlayerClassComp = ({open,loading,playerClass,handleChange,handleInputChange,toggleOpen,inputValue,options,filter}:EditPlayerClassCompProps) => {

    return (
        <Autocomplete
            freeSolo
            open={open}
            onOpen={toggleOpen}
            onClose={toggleOpen}
            loading={loading}
            value={playerClass}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={options}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option);
                if (inputValue !== '' && !isExisting) {
                    filtered.push(inputValue);
                }
                return filtered;
            }}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }
                if (option) {
                    return option;
                }
                return option;
            }}
            renderOption={(props, option) => <li {...props}>{option}</li>}
            sx={{ width: '100%', marginX: 'auto', bgcolor: 'white', padding: .3, borderRadius: 1 }}
            renderInput={(params) => <TextField {...params} label="Classes" variant="standard" />}
        />
    );

}

export default EditPlayerClassComp;