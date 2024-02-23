import { tss } from "tss-react";

export const useStyles = tss.create({
  title: {
    textAlign: 'center',
    color: '#E8EAED',
    margin: '10px'
  },
  stats_title: {
    textAlign: 'center',
    color: '#E8EAED',
    margin: '20px'
  },
  paginate_wrapper: {
    marginTop: '30px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      color: '#E8EAED'
    }
  }
})
