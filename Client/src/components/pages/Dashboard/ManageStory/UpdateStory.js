import clsx from 'clsx'
import styles from "../dashboard.module.scss"
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { storySlice } from '../../../../redux/reducers/storySlice'
import { tellerSlice } from '../../../../redux/reducers/tellerSlice'
import { categorySlice } from '../../../../redux/reducers/categorySlice'
import { TextField, Box, TextareaAutosize } from '@mui/material'

import Autocomplete from '@mui/material/Autocomplete';
import { authorSlice } from '../../../../redux/reducers/authorSlice'
import { authorsState, categoriesState, storiesState, tellersState } from '../../../../redux/selectors'
import useInputObject from '../../../../hooks/useInputObject'
import { useParams } from 'react-router-dom'


export default function UpdateStory(){
    
    const { storyId } = useParams();
  
    const dispatch = useDispatch()
    

    const [image, setImage] = useState()
    const [chapter, setChapter] = useState()

    const authors = useSelector(authorsState)
    const tellers = useSelector(tellersState)
    const categories = useSelector(categoriesState)

    const story = useSelector(storiesState)

    useEffect(()=>{
        dispatch(storySlice.actions.getStoryRequest(storyId))
        dispatch(authorSlice.actions.getAuthorsRequest())
        dispatch(tellerSlice.actions.getTellersRequest())
        dispatch(categorySlice.actions.getCategoriesRequest())

    },[dispatch])
    const [data, setData, setDataObj] = useInputObject(story)
    useEffect(()=>{
        setDataObj(story)
    },[story])

    useEffect(()=>{
        // setDataObj(story)
        console.log({data})
    },[data])
    
    const handleSubmit = () => {
        let formData = new FormData();
    
        for (var key of Object.keys(data)) {
            formData.append(key,data[key])
        }

        if(image){
            formData.append("img", image) 
            console.log(image)
        }
              

        formData.delete("chapter")

        dispatch(storySlice.actions.updateStoryRequest(formData))
    }
  
    return(
        <div className={clsx("container",styles.wrapper)}>
            Sửa truyện
            <div className="d-flex j-center f-column">
                <div>
                    <TextField sx={{ width: 300 }} label={"Tên truyện"} margin="normal" value={data.name||""} onChange={setData("name")}/>
                </div>
                <div>
                    <TextareaAutosize style={{ width: 292 }} minRows={10} maxRows={15} placeholder={"Tóm tắt nội dung"} margin="normal" value={data.description} onChange={setData("description")}/>
                </div>
                <div>
                    {authors.length>0&&story.authorId&&
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={authors}
                        defaultValue={authors.find(author=>author._id==story.authorId)}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} label={"Tác giả"} value={authors.find(author=>author._id==story.authorId).name} margin="normal"/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        
                        onChange={(event, value) => setDataObj({...data, authorId: value!==null ? value._id:""})}      
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                    }
                </div>
                <div>
                {tellers.length>0&&story.tellerId&&
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={tellers}
                        defaultValue={tellers.find(teller=>teller._id==story.tellerId)}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} label={"Người đọc"} value={tellers.find(teller=>teller._id==story.tellerId).name} margin="normal"/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => setDataObj({...data, tellerId: value!==null ? value._id:""})}        
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                }
                </div>
                
                <div>
                {categories.length>0&&story.categoryId&&
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        getOptionLabel={(option)=>option.name}
                        defaultValue={categories.find(category=>category._id==story.categoryId)}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} value={categories.find(category=>category._id==story.categoryId).name} label={"Thể loại"} margin="normal"/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => setDataObj({...data, categoryId: value!==null ? value._id:""})}      
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                }
                </div>
                <div>
                    <span>Ảnh bìa:</span>
                    <input onChange={e=>setImage(e.target.files[0])} type={"file"}/>
                </div>
                <div>
                <button onClick={handleSubmit}>Sửa</button>
                </div>
                
            </div>
            

        </div>
    )
}