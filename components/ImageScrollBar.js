import { useContext } from "react";
import Image from "next/image";
import {Box, Icon, Flex} from '@chakra-ui/react'
import { ScrollMenu, visibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { dataAttr } from "@chakra-ui/utils";

const LeftArrow=()=>{
    const {scrollPrev} = useContext(visibilityContext);

    return (
    <Flex justifyContent='center' alignItems='center' margin='1' >
        <Icon
        as={FaArrowAltCircleLeft}
        onClick={()=>scrollPrev()}
        fontSize='2x1'
        cursor='pointer'
        />
    </Flex>
    )
}
const RightArrow=()=>{
    const {scrollPrev} = useContext(visibilityContext);

    return (
    <Flex justifyContent='center' alignItems='center' margin='1' >
        <Icon
        as={FaArrowAltCircleRight}
        onClick={()=>scrollNext()}
        fontSize='2x1'
        cursor='pointer'
        />
    </Flex>
    )
}



const ImageScrollBar = ({data})=>{
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{overflow: 'hidden'}}>
        {data.map((item)=>(
            <Box  key={item.id} width='910px' itemID={item.id} overflow='hidden' p='1'>
                <Image 
                alt='property'
                placeholder="blur" 
                blurDataURL={item.url} 
                src={item.url}
                width={1000} 
                height={500}
                // If the width is 500, then use 1000, same for 1023, finally if all fails use 10000px 
                sizes='(max-width:500px) 100px (max-width:1023px) 400px, 1000px'
                />
            </Box>
        ))}

    </ScrollMenu>
}

export default ImageScrollBar;