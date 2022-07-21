import { useLocation, useNavigate } from "react-router-dom";

//mui components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Rawjson = () => {
  const location: any = useLocation()
  const navigate = useNavigate();

  return (
      <div className='card'>
          <Card variant="outlined" sx={{ maxWidth: 800, margin: 2, mx: 'auto' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                JSON Data
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {JSON.stringify(location.state)}
              </Typography>
            </CardContent>
          </Card>
        <Button variant="outlined" onClick={() => navigate('/')}>Go Back</Button>
      </div>
  )
}

export default Rawjson