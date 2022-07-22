import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

//mui imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Posts from './Posts';
import { getPosts } from '../api/getPosts';

const Main = () => {
    const [data, setData] = useState<any[]>([])
    const [count, setCount] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    let isPostFound: boolean = false;

    const apicall = async () => {
        setLoading(true);

        const items = await getPosts(count);
        if (items) {
            let temp = [...data, ...items]
            setData(temp)
        } else {
            setHasMore(false)
        }
        setLoading(false);
    }

    useEffect(() => {
        if (hasMore) apicall();
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
                            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.author.toLowerCase().includes(searchTerm.toLowerCase())
                        ) {
                            return post;
                        }
                    }).map((item, index) => {
                        isPostFound = true;
                        return (
                            <Posts item={item} key={index} data-testid='Posts'/>
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
