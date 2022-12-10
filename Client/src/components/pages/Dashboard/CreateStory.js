import clsx from 'clsx'
import styles from "./dashboard.module.scss"
import fakeStories from "../../../mocks/story.json"
import StoryItem from './StoryItem'
import Input from "../../helpers/Input"
import { useEffect, useState } from 'react'
import { postCreateStory } from '../../../api'
import { useDispatch, useSelector } from "react-redux"
import { storySlice } from '../../../redux/reducers/storySlice'
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Autocomplete from '@mui/material/Autocomplete';
import { authorSlice } from '../../../redux/reducers/authorSlice'
import { authorsState } from '../../../redux/selectors'


export default function CreateStory(){
    
    const dispatch = useDispatch()
    const [data, setData] = useState({
        name:"",
        author: "",
        teller: "",
        description: "",
        category: ""
        // category
        // description
    })
    const [image, setImage] = useState()
    const [chapter, setChapter] = useState()
    const authors = useSelector(authorsState)

    useEffect(()=>{
        // fetch 
        dispatch(authorSlice.actions.getAuthorsRequest())

    },[dispatch])
    
    
    const handleSubmit = () => {
        let formData = new FormData();
        formData.append("img", image)

        for(let file of chapter)
            formData.append("chapter", file)

        // formData.append("chapter", chapter)
        for (var key of Object.keys(data)) {
            formData.append(key,data[key])
        }
        // postCreateStory(formData).then(res=>console.log(res))
        dispatch(storySlice.actions.createStoryRequest(formData))
    }

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 }]
  
    return(
        <div className={clsx("container",styles.wrapper)}>
            Thêm truyện
            <div className="d-flex j-center f-column">
                <div>
                    <span>Tên truyện:</span>
                    <Input value={data.name} onChangeObject={setData} field={"name"}/>
                </div>
                <div>
                    <span>Tên tác giả:</span>
                    <Input value={data.author} onChangeObject={setData} field={"author"}/>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={authors}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        renderInput={(params) =><TextField {...params} label={"MO"} />}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => console.log(value)}         
                    />
                </div>
                <div>
                    <span>Tên người đọc:</span>
                    <Input value={data.teller} onChangeObject={setData} field = {"teller"}/>
                </div>
                <div>
                    <span>Tóm tắt nội dung:</span>
                    <Input value={data.description} onChangeObject={setData} field = {"description"}/>
                </div>
                <div>
                    <span>Thể loại:</span>
                    <Input value={data.category} onChangeObject={setData} field = {"category"}/>
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