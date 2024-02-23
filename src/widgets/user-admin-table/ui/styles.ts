import { tss } from "tss-react";

export const useStyles = tss.create({
  root: {
    backgroundColor: '#2A2E39',
    '& th,td,svg': {
      color: '#E8EAED'
    }
  },
  user_collapse: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
})
