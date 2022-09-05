import DiffToolTipComp from "./DiffToolComp";

export interface DiffToolTipCompProps {
    content:string,
    word:string,
}

const DiffTool = ({content,word}:DiffToolTipCompProps) => {
    return (
        <DiffToolTipComp
            content={content}
            word={word}
        />
    );
}

export default DiffTool;