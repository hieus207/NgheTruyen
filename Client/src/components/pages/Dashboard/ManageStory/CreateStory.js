import clsx from 'clsx'
import styles from "../dashboard.module.scss"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { storySlice } from '../../../../redux/reducers/storySlice'
import { tellerSlice } from '../../../../redux/reducers/tellerSlice'
import { categorySlice } from '../../../../redux/reducers/categorySlice'
import { TextField, Box, TextareaAutosize } from '@mui/material'

import Autocomplete from '@mui/material/Autocomplete';
import { authorSlice } from '../../../../redux/reducers/authorSlice'
import { authorsState, categoriesState, tellersState } from '../../../../redux/selectors'
import useInputObject from '../../../../hooks/useInputObject'


export default function CreateStory(){
    const [data, setData, setDataObj] = useInputObject({
        name:"",
        authorId: "",
        tellerId: "",
        description: "",
        categoryId: ""
    })

    const dispatch = useDispatch()

    const [image, setImage] = useState()
    const [chapter, setChapter] = useState()

    const authors = useSelector(authorsState)
    const tellers = useSelector(tellersState)
    const categories = useSelector(categoriesState)

    useEffect(()=>{
        dispatch(authorSlice.actions.getAuthorsRequest({all:true}))
        dispatch(tellerSlice.actions.getTellersRequest({all:true}))
        dispatch(categorySlice.actions.getCategoriesRequest({all:true}))

    },[dispatch])
    

    const handleSubmit = () => {
        let formData = new FormData();
        if(image)
            formData.append("img", image)

        for(let file of chapter)
            formData.append("chapter", file)

        for (var key of Object.keys(data)) {
            formData.append(key,data[key])
        }
        console.log(data)
        dispatch(storySlice.actions.createStoryRequest(formData))
    }
  
    return(
        <div className={clsx("container",styles.wrapper)}>
            Thêm truyện
            <div className="d-flex j-center f-column">
                <div>
                    <TextField sx={{ width: 300 }} label={"Tên truyện"} margin="normal" value={data.name} onChange={setData("name")}/>
                </div>
                <div>
                    <TextareaAutosize style={{ width: 292 }} minRows={10} maxRows={15} placeholder={"Tóm tắt nội dung"} margin="normal" value={data.description} onChange={setData("description")}/>
                </div>
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={authors}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} label={"Tác giả"} margin="normal"/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => setDataObj({...data, authorId: value!==null ? value._id:""})}      
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                </div>
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={tellers}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} label={"Người đọc"} margin="normal"/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => setDataObj({...data, tellerId: value!==null ? value._id:""})}        
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                </div>
                
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} label={"Thể loại"} margin="normal"/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => setDataObj({...data, categoryId: value!==null ? value._id:""})}      
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                </div>
                <div>
                    <span>Ảnh bìa:</span>
                    <input onChange={e=>setImage(e.target.files[0])} type={"file"}/>
                    
                </div>
                <div>
                    <span>Tập truyện:</span>
                    <input onChange={e=>setChapter(e.target.files)} multiple type={"file"}/>                    
                </div>
                <div>
                <button onClick={handleSubmit}>Create</button>
                </div>
                
            </div>
            

        </div>
    )
}