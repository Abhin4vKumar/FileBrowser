import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


export const FilesViewer = ({files,onBack,onOpen}) => (
    <table class="table justify-self-center w-[70%] transition duration-300 ease-in-out text-xl">
        <tbody>
            <tr className="cursor-pointer w-full transition duration-300 ease-in-out hover:bg-black hover:text-white" onClick={onBack}>
                <td className="icon-row">
                    <FontAwesomeIcon icon="fa-solid fa-folder-open" />
                </td>
                <td className='px-[10px] py-[10px]'>...</td>
                <td></td>
            </tr>
            {files.map(({name,directory,size})=>{
                return(
                    <tr className="cursor-pointer last:pb-[100px] w-full transition duration-300 ease-in-out hover:bg-black hover:text-white" onClick={()=> directory && onOpen(name)}>
                        <td className="icon-row">
                            {directory ? <FontAwesomeIcon icon="fa-solid fa-folder" /> : <FontAwesomeIcon icon="fa-solid fa-file" />}
                        </td>
                        <td className='px-[10px] py-[10px]'>{name}</td>
                        <td>
                            <span className="float-end">{size}</span>
                        </td>
                    </tr>
                )
            })

            }
        </tbody>
    </table>
)