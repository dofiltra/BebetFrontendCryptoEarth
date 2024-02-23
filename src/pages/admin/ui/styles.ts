import { tss } from "tss-react";

export const useStyles = tss.create({
  title: {
    textAlign: 'center',
    color: '#E8EAED',
    margin: '10px'
  },
  navigation: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  link: {
    color: '#E8EAED',
    padding: 10,
    textDecoration: 'none'
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
