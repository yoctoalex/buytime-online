import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {strings} from "../../../constants/strings";
import { GreenButtonSmall } from "../../../components/button/green-button";
import axios from "axios";
import {
    GEO_LOCATION_NEAREST_STORE,
    GEO_LOCATION_USER_ZIPSTORES,
    GEO_LOCATION_ZIP_INFO
} from "../../../helpers/constants";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const { layout: { nearestStoreSection: { title, zipCode, findButton, distanceTitle, errorNothingFound, messageSearching }}} = strings;

export const NearestStoreSection = (props) => {
    const [pending, setPending] = useState(false);
    const [userZipCode, setUserZipCode] = useState();
    const [zipInfo, setZipInfo] = useState(null);
    const [stores, setStores] = useState();

    const handleZipCode = (zip) => {
        if (!zip || zip.trim().length === 0)
        {
            setStores([]);
            setZipInfo(null);
            return ;
        }
        setPending(true);
        const linkStores = `${GEO_LOCATION_NEAREST_STORE}/${zip}/20000/3`;

        axios.get(linkStores).then(response => {
            if (response.status === 200) {
                setStores(response.data);
            }
            else {
                setStores([]);
            }
            setPending(false);
        }).catch(() => {
            setStores([]);
            setPending(false);
        });

        const linkZip = `${GEO_LOCATION_ZIP_INFO}/${zip}`;
        axios.get(linkZip).then(response => {
            if (response.status === 200) {
                setZipInfo(response.data);
            }
            else {
                setZipInfo(null);
            }
            setPending(false);
        }).catch(() => {
            setPending(false);
            setZipInfo(null);
        });
    }

    useEffect(() => {
        if (userZipCode === undefined) {
            navigator.geolocation.getCurrentPosition((position) => {
                setZipInfo({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });

                const linkNearestGeo = `${GEO_LOCATION_USER_ZIPSTORES}/${position.coords.latitude}/${position.coords.longitude}`;
                axios.get(linkNearestGeo).then(response => {
                    if (response.status === 200) {
                        setUserZipCode(response.data.zip.zip)
                        setStores(response.data.stores);
                        setZipInfo(response.data.zip);
                    }
                    setPending(false);
                }).catch(() => {
                    setZipInfo(null);
                    setPending(false);
                });
            }, (e) => {
                setUserZipCode(process.env.REACT_APP_DEFAULT_ZIP || "98104");
                handleZipCode(process.env.REACT_APP_DEFAULT_ZIP || "98104");
            });
        }
    }, [userZipCode]);


    const position = zipInfo ? [zipInfo.lat, zipInfo.lon] : [51.505, -0.09]

    return (<Wrapper>
        <BlockLeft>
            <div>
                <TitleSection>{title}</TitleSection>
                <div>
                    <ZipCode value={userZipCode} autoComplete="off" name="login" type="email" placeholder={zipCode} onChange={(e) => setUserZipCode(e.target.value)}/>
                    <WhiteButton onClick={() => handleZipCode(userZipCode)}>{findButton}</WhiteButton>
                </div>
            </div>
            <div>
                {
                    !pending && stores && stores.map(s => (
                        <StoreItem>
                            <LeftSection>
                                <Title>{s.title}</Title>
                                <Addresss>{s.address}</Addresss>
                            </LeftSection>
                            <RightSection>
                                <DistanceTitle>{distanceTitle}</DistanceTitle>
                                <Distance>{Math.round(parseFloat(s.distance.toString()) / 1000 * 0.62 * 10) / 10} mi</Distance>
                            </RightSection>
                        </StoreItem>
                    ))
                }
                {(pending ? <Error>{messageSearching}</Error> : undefined)}
                {
                    ((!stores || stores.length === 0) && !zipInfo && (userZipCode) && (!pending)) ? (
                            <Error>{errorNothingFound}</Error>
                        ): undefined
                }
            </div>
        </BlockLeft>
        <Block>
            <MapContainer key={JSON.stringify(position)} center={position} zoom={10} scrollWheelZoom={false} style={{
                width: "100%",
                height: "410px"
            }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    stores && stores.map(s => (
                        <Marker position={[s.lat, s.lon]}>
                            <Popup>
                                {s.title}<br/>{s.address}
                            </Popup>
                        </Marker>))
                }
            </MapContainer>
        </Block>

    </Wrapper>)
}

const Block = styled.div`  
    width: calc(100vw - 430px);
    margin-left: 30px;
`;

const BlockLeft = styled.div`       
    width: 400px;   
`;

const Wrapper = styled.div`
	background: #0DA95E;
	padding: 24px	
	padding-left: 15%;	
	display: flex;       
	justify-content: space-between;		
`;

const TitleSection = styled.h4`
    align-items: flex-start;
	font-size: 26px;	
	text-transform: capitalize;
	font-family: Montserratsemibold, sans-serif;
	text-align: left;
	color: white;
	margin-bottom: 2px;
    width: 400px;   
`;

const ZipCode = styled.input`
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
	border-radius: 10px;
	padding: 9px;
	margin-right: 10px;
	border: 0px
	width: 300px
	
	::placeholder {
	    color: rgba(255, 255, 255, 0.7);
	}
`

const WhiteButton = styled(GreenButtonSmall)`
	color: #0DA95E;
	background-color: white;
`;

const StoreItem = styled.div`
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px;
    background-color: white;
    display: flex;    
    height: 100px;
`;

const Title = styled.div`
   color: #0DA95E;
   text-transform: uppercase;
   font-weight: bold;
   margin-bottom: 10px;
`;

const DistanceTitle = styled.div`   
    text-transform: uppercase;
    text-align: center;
    font-size: 10px;   
`;

const Addresss = styled.div`
   margin-right: 10px;
`;

const Distance = styled.div`
   color: #0DA95E;   
   font-weight: bold;
   text-align: center;
   margin-top: 4px;
`;

const LeftSection = styled.div`
    width: 80%;
`;
const RightSection = styled.div`
    border-left: 1px solid  #0DA95E;    
    width: 20%;
`;

const Error = styled.div`
    color: white;
`;