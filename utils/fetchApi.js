import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';


export const fetchApi = async(url)=>{
  const {data} = await axios.get((url),{
    headers: {
  'X-RapidAPI-Key': 'fa949c3f9amshca62eea5488b1d8p10e5bcjsn8c23d2d3f0bc',
  'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
}});
  return data
}