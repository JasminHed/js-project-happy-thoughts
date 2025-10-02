import moment from "moment";
import { useState } from "react";
import styled from "styled-components";

const CardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 3px;
  border: 1px solid var(--color-border);
  box-shadow: 6px 8px 0 0 #000;
  width: 100%;
  max-width: 500px;
  height: 150px;
  gap: 15px;
  margin: 20px auto;
  background-color: var(--color-background);
`;

const MessageText = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: black;
  padding-left: 10px;
  margin-top: 15px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 5px;
  margin-top: auto;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Button = styled.button`
  background-color: var(--color-likebutton);
  color: var(--color-text);
  border: none;
  border-radius: 50px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 5px;
  margin-bottom: 20px;
  margin-left: 5px;

  &:focus {
    background-color: var(--color-button);
  }
`;
const Paragraph = styled.div`
  font-size: 12px;
  color: var(--color-text);
  margin-top: 5px;
  margin-bottom: 20px;
`;
const TimeStamp = styled.time`
  font-size: 12px;
  color: var(--color-text);
  margin-right: 10px;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const MessageCard = ({ message }) => {
  //receive message (like,time,message)
  const [likes, setLikes] = useState(message.hearts || 0); //tracks likes + update

  //sends or post "like" to API so it can update
  const handleLike = () => {
    fetch(
      `https://happy-thoughts-api-4ful.onrender.com/thoughts/${message._id}/like`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then(() => setLikes(likes + 1))
      .catch((error) => console.error("Failed to like the thought", error));
  };

  return (
    <CardWrapper>
      <MessageText>{message.message}</MessageText>
      <FooterContainer>
        <LikeWrapper>
          <Button onClick={handleLike}>❤️</Button>
          <Paragraph> x {likes} </Paragraph>
        </LikeWrapper>
        <TimeStamp>{moment(message.createdAt).fromNow()} </TimeStamp>
      </FooterContainer>
    </CardWrapper>
  );
};

export default MessageCard;
