import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Row, Col, Card } from 'react-bootstrap';

export default function MyListedItems({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true);
  const [listedItems, setListedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  const fetchNFTMetadata = async (uri) => {
    try {
      const response = await fetch(uri);

      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching NFT metadata:', error);
      return null;
    }
  };

  const loadListedItems = async () => {
    try {
      const itemCount = await marketplace.itemCount();
      const listedItems = [];
      const soldItems = [];

      for (let indx = 1; indx <= itemCount; indx++) {
        const i = await marketplace.items(indx);

        if (i.seller.toLowerCase() === account) {
          const uri = await nft.tokenURI(i.tokenId);
          const metadata = await fetchNFTMetadata(uri);

          if (metadata) {
            const totalPrice = await marketplace.getTotalPrice(i.itemId);
            const item = {
              totalPrice,
              price: i.price,
              itemId: i.itemId,
              name: metadata.name,
              description: metadata.description,
              image: metadata.image,
            };
            listedItems.push(item);

            if (i.sold) {
              soldItems.push(item);
            }
          }
        }
      }

      setLoading(false);
      setListedItems(listedItems);
      setSoldItems(soldItems);
    } catch (error) {
      console.error('Error loading listed items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListedItems();
  }, [account]);

  const renderSoldItems = (items) => {
    return (
      <>
        <h2>Sold</h2>
        <Row xs={1} md={2} lg={4} className="g-4 py-3">
          {items.map((item, idx) => (
            <Col key={idx} className="overflow-hidden">
              <Card>
                <Card.Img variant="top" src={item.image} />
                <Card.Footer>
                  For {ethers.utils.formatEther(item.totalPrice)} ETH - Received {ethers.utils.formatEther(item.price)} ETH
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  };

  if (loading) {
    return (
      <main style={{ padding: '1rem 0' }}>
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <div className="flex justify-center">
      {listedItems.length > 0 ? (
        <div className="px-5 py-3 container">
          <h2>Listed</h2>
          <Row xs={1} md={2} lg={4} className="g-4 py-3">
            {listedItems.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer>{ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
      ) : (
        <main style={{ padding: '1rem 0' }}>
          <h2>No listed assets</h2>
        </main>
      )}
    </div>
  );
}
