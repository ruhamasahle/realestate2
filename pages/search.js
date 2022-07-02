import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {Flex,Text, Box} from '@chakra-ui/react'
import {Icon} from "@chakra-ui/react";
import {BsFilter} from 'react-icons/bs'
import noresult from '../assets/noresult.svg'

import {fetchApi, baseUrl} from '../utils/fetchApi'

import SearchFilters from "../components/SearchFilters";
import Property from '../components/Property'

const Search =({properties})=>{
  const [searchFilters, setSearchFilters]= useState('') 
  const router= useRouter();
   
    return (
        <Box>
            <Flex
            cursor='pointer'
            bg='gray.100'
            borderBottom='1px'
            p='2'
            fontSize='1g'
            fontWeight='black'
            alignItems='center'
            justifyContent='center'
            onClick={()=> setSearchFilters((prevFilters)=> !prevFilters)}
            >
            <Text>Search Property by Filters</Text>
            <Icon paddingLeft='2' w='7' as={BsFilter}/>
            </Flex>
            {searchFilters && <SearchFilters /> }
            <Text fontSize='2x1' p='4' fontWeight='bold'>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap='wrap'>
            {properties.map((property) => <Property property={property} key={property.id} />)}
             </Flex>
            {properties.length === 0 && (
             <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
            <Image alt='no result' src={noresult} />
            <Text fontSize='2xl' marginTop='3'>No Result Found.</Text>
        </Flex>)}

        </Box>

    )
}

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
  
    return {
      props: {
        properties: data?.hits,
      },
    };
  }
  



export default Search;