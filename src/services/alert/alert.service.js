import axios from 'axios';

export const SendKeywordAlert = async (msg) => {
  await axios({
    url: 'http://localhost:3000/api/v1/keywords/matching',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      msg,
    },
  });
};
