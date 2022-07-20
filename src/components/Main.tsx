import { useState, useEffect } from 'react'  
import { useNavigate } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';

//mui imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const Main = () => {
    const [data, setData] = useState <any[]>([])
    const [count, setCount] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    let isPostFound: boolean = false;
    let navigate = useNavigate()
    
    const apicall = async () => {
        setLoading(true)
        await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`)
            .then((res) => res.json())
            .then((items) => {
                if (items.hits.length > 0) {
                    let temp = [...data, ...items.hits]
                    setData(temp)
                } else {
                    setHasMore(false)
                }
            })
            .finally(() => {
                setLoading(false)
            })
        return data;    
    }

    useEffect(() => {
        if(hasMore) apicall();
        const interval = setInterval(() => {
            setCount(prev => prev + 1) 
        }, 10000);
        return (() => clearInterval(interval))
    }, [count])

    const scrollToEnd = () => {
        setCount(prev => prev + 1) 
    }

    let inputHandler = (event: any) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className='main'>
            <TextField
              sx={{ margin: 2 }}  
              id="outlined-basic"
              label="Enter title or author"
              variant="outlined"
              onChange={inputHandler}
            />
            <InfiniteScroll
                dataLength={data.length}
                next={scrollToEnd}
                hasMore={hasMore}
                loader={false}
                // endMessage={
                //     <p style={{ textAlign: 'center' }}>
                //       <b>Yay! You have seen it all</b>
                //     </p>
                // }
            >
                <Box sx={{ 
                    display: 'grid',
                    gap: 1,
                    maxWidth: 800,
                    margin: 2, 
                    mx: 'auto'
                 }}>
                    {data.filter((post) => {
                        if (searchTerm === '') {
                            return post;
                        }
                        else if (
                            post.title.toLowerCase().includes(searchTerm.toLowerCase())||
                            post.author.toLowerCase().includes(searchTerm.toLowerCase())
                        ) {
                            return post;
                        }
                    }).map((item, index) => {
                        isPostFound = true;
                        return (
                            <Card variant='outlined' key={index} sx={{ alignItems: 'center' }}>
                                <CardContent key={index}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom component="div">
                                        By: {item.author}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom component="div">
                                        url: {item.url}
                                    </Typography>
                                    <Typography variant="subtitle2" display="block" gutterBottom>
                                        Created at: {moment(item.created_at).format('LLL')}
                                    </Typography>
                                    <Typography variant="subtitle2" display="block" gutterBottom>
                                        Tags: {item._tags[0]}, {item._tags[1]}, {item._tags[2]}
                                    </Typography>
                                    <CardActions>
                                        <Button id="button" variant="outlined" onClick={() => {
                                            navigate('/jsondetails', { state: item })
                                        }}>
                                            Show JSON
                                        </Button>
                                        <Button variant="outlined">
                                            <Link href={item.url} color="inherit" underline="none" target="blank">Full Artical</Link>
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </Card>    
                        )
                    })}
                </Box>
            </InfiniteScroll>

            {/* loading */}
            {loading && searchTerm.trim().length === 0 && <h4>Loading...</h4>}

            {/* When user reaches api limit */}
            {!hasMore && searchTerm.trim().length === 0 && 
                <Typography variant='h4' gutterBottom>
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                </Typography>
            }

            {/* If title or author not found in search bar */}
            {searchTerm.trim().length > 0 && !isPostFound &&
                <Typography variant='h5' gutterBottom>Data Not Found</Typography>
            }
        </div>
  )
}

export default Main;
