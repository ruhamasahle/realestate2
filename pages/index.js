import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {Flex, Box, Text, Button} from '@chakra-ui/react'

import { baseUrl, fetchApi } from '../utils/fetchApi'

import Property from '../components/Property'

const Banner=({purpose, title1, title2, desc1, imageUrl, desc2, buttonText, linkName})=>(
  <Flex flexWrap='wrap' justifyContent='center' alignItems m='10'>
    {/* <Image src={imageUrl} width={500} height={300} alt='banner' /> */}
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>
        {purpose}  </Text>
      <Text fontSize='3x1' fontWeight='bold'>
        {title1}<br/>{title2}
      </Text>
      <Text fontSize='lg'paddingTop='3' paddingBottom='3' color='gray.700'>
        {desc1}
      </Text>
      <Button fontSize='xl'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)



export default function Home({propertyForRent, propertyForSale}) {
  // console.log('hello', propertyForRent, propertyForSale)
  return (
    <Box>
      <Banner 
      purpose='For Sale'
      title1="Rental Homes for"
      title2="Everyone"
      desc1='Explore Apartments, Villas, Homes'
      desc2='and more'
      buttonText='Explore Renting'
      linkName='/search?purpose=for-rent'
      // imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap='wrap'>
        {
          propertyForRent.map((property)=> 
          <Property property={property} key={property.id}/>
          )
        }
      </Flex>
      <Banner 
      purpose='Buy a Home'
      title1="Find, Buy and Own Your"
      title2="Dream Home"
      desc1='Explore Apartments, Villas, Homes'
      desc2='and more'
      buttonText='Explore Buying'
      linkName='/search?purpose=for-sale'
      // imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
      <Flex flexWrap='wrap'>
      {
        propertyForSale.map((property)=> <Property property={property} key={property.id}/>)
      }
      </Flex>
    </Box>
  )
}

export async function getStaticProps(){
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);
 
  // automatically adds these as props to our component on the top.
  return{
    props:{
      propertyForRent: propertyForRent?.hits,
      propertyForSale: propertyForSale?.hits
    }
  }

}
