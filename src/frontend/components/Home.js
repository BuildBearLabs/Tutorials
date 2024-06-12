import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Row, Col, Card, Button } from 'react-bootstrap';

function renderSoldItems(items) {
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
}

export default function Home({ marketplace, nft }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
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

  // Placeholder for the buyMarketItem function
  const buyMarketItem = async (item) => {
    try {
      
      await marketplace.buyItem(item.itemId, { value: item.totalPrice });

      loadMarketplaceItems();
    } catch (error) {
      console.error('Error buying item:', error);
    }
  };

  const loadMarketplaceItems = async () => {
    try {
      const itemCount = await marketplace.itemCount();
      const items = [];
      const soldItems = [];

      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.items(i);

        if (!item.sold) {
          const uri = await nft.tokenURI(item.tokenId);
          const metadata = await fetchNFTMetadata(uri);

          if (metadata) {
            const totalPrice = await marketplace.getTotalPrice(item.itemId);
            items.push({
              totalPrice,
              itemId: item.itemId,
              seller: item.seller,
              name: metadata.name,
              description: metadata.description,
              image: metadata.image,
            });
          }
        } else {
          // Item is sold
          soldItems.push({
            totalPrice: item.totalPrice,
            price: item.price,
            itemId: item.itemId,
          });
        }
      }

      setLoading(false);
      setItems(items);
      setSoldItems(soldItems);
    } catch (error) {
      console.error('Error loading marketplace items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: '1rem 0' }}>
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <div className="flex justify-center">
      {items.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <main style={{ padding: '1rem 0' }}>
          <h2>No listed assets</h2>
        </main>
      )}
      {soldItems.length > 0 && renderSoldItems(soldItems)}
    </div>
  );
}
