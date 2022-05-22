import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { format, getDay, differenceInDays } from 'date-fns';
import StarOffImg from '@/assets/images/StarOff.png';
import ButtonStarWhite from '@/assets/images/ButtonStarWhite.png';
import StarOnImg from '@/assets/images/StarOn.png';
import { cateogoryAll } from '@/frontDB/filterDB';
import { viewDay } from '@/utils';
import { useNavigate, useParams } from 'react-router-dom';
import useQuery from '@/hooks/useQuery';

function PostCard({ data }) {
  const [IsDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  const query = useQuery();
  const { postId } = useParams();

  const renderDate = useCallback(() => {
    const date = new Date(data.createdDate);
    return `${format(date, 'M/d')} (${viewDay(getDay(date))})`;
  }, []);

  const handleLocate = useCallback(() => {
    const pageNum = query.get('page');
    if (pageNum) {
      return navigate(`/post/${data.boardId}?page=${pageNum}`);
    }
    navigate(`/post/${data.boardId}`);
  }, [query.get('page')]);

  const renderDay = useCallback(() => {
    const date = new Date(data.expiredDate);
    const nowDate = new Date();
    return differenceInDays(date, nowDate) + 1;
  }, []);

  useEffect(() => {
    const bool = !data.viewable || renderDay() < 0;
    setIsDisable(bool);
  }, []);

  return (
    <Wrapper onClick={handleLocate} current={String(data.boardId) === postId}>
      <CardHead isDisabled={IsDisable}>
        <ProfileBox>
          <img src={`${data.profileImage}?cache=${Math.random()}`} alt="" />
        </ProfileBox>
        <TextBox>
          <Dday>{IsDisable ? '마감' : `D-${renderDay()}`}</Dday>
          <CardDate>{renderDate()}</CardDate>
          <CardName>{data.nickname}</CardName>
        </TextBox>
      </CardHead>
      <CardBody isDisabled={IsDisable}>
        <TextBox>
          <TitleBox>
            <h5>{data.title}</h5>
            <Star />
          </TitleBox>
          <TextList>
            <CategoryText
              textColor={data.categoryParentId === 1 ? '#005ec5' : '#F7971E'}
              isDisabled={IsDisable}
            >
              {cateogoryAll.filter((category) => `${data.categoryId}` === category.value)[0].name}
            </CategoryText>
            <p>{data.approachCode ? '온라인' : '오프라인'}</p>
            <p>{`${data.recruitedCrew}/${data.totalCrew}명`}</p>
            <p>
              조회수
              {` ${data.hit}`}
            </p>
          </TextList>
        </TextBox>
        <ButtonBox>
          <ButtonDetail>상세보기</ButtonDetail>
          <ButtonParticipate disabled={IsDisable}>참여하기</ButtonParticipate>
        </ButtonBox>
      </CardBody>
    </Wrapper>
  );
}

export default PostCard;

const Wrapper = styled.div`
  height: 94px;
  background-color: #fff;
  border-radius: 10px;
  padding: 16px 22px 16px 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: 0.2s;
  border: 1px solid transparent;
  cursor: pointer;
  :hover {
    border-color: #a8a8a8;
  }
  ${(props) =>
    props.current &&
    css`
      border-color: #a8a8a8;
    `}
  @media screen and (max-width: 820px) {
    height: 108px;
    padding: 10px 12px 14px 12px;
    flex-direction: column;
    position: relative;
  }
`;

const ProfileBox = styled.div``;

const TextBox = styled.div``;

const Dday = styled.p``;

const CardDate = styled.p``;

const CardName = styled.p``;

const TitleBox = styled.div``;

const CategoryText = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-right: 20px;
  ${(props) =>
    props.textColor &&
    css`
      color: ${props.textColor};
    `}
  ${(props) =>
    props.isDisabled &&
    css`
      color: #a8a8a8;
    `}
  @media screen and (max-width: 820px) {
    margin-right: 12px;
  }
`;

const Star = styled.div`
  width: 30px;
  height: 30px;
  background: #c4c4c4 url(${ButtonStarWhite}) center/20px no-repeat;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 22px;
  margin-right: 14px;
  transition: 0.3s;

  :hover {
    background-color: #b0b0b0;
  }

  @media screen and (max-width: 820px) {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background-size: 14px;
    margin: 0;
  }
`;

const TextList = styled.div``;

const ButtonBox = styled.div``;

const ButtonDetail = styled.button`
  cursor: pointer;
  background-color: #c4c4c4;
  :hover {
    background-color: #b0b0b0;
  }
`;

const ButtonParticipate = styled.button`
  cursor: pointer;

  background-color: #00b7ff;
  :hover {
    background-color: #00a3e3;
  }

  :disabled {
    background-color: #e2e2e2;
    cursor: default;
  }
`;

const CardHead = styled.div`
  display: flex;
  min-width: 204px;
  height: 100%;
  border-right: 1px solid #a8a8a8;

  ${ProfileBox} {
    min-width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: transparent;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
  }

  ${TextBox} {
    width: 100%;
    height: 100%;
    padding: 0 14px;
    ${Dday} {
      margin-top: 4px;
      font-size: 16px;
      font-weight: 700;
      color: #00b7ff;
      text-align: right;
      ${(props) =>
        props.isDisabled &&
        css`
          color: #a8a8a8;
        `}
    }

    ${CardDate} {
      margin-top: 0px;
      font-size: 12px;
      font-weight: 300;
      color: #868686;
    }

    ${CardName} {
      margin-top: 2px;
      font-size: 13px;
      font-weight: 500;
      color: #000;
    }
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    height: 16px;
    border: none;
    ${ProfileBox} {
      display: none;
    }
    ${TextBox} {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0;
      ${Dday} {
        margin: 0;
        margin-right: auto;
      }

      ${CardDate} {
        margin: 0;
        order: 1;
        margin-left: 12px;
        padding-right: 28px;
      }

      ${CardName} {
        margin: 0;
        font-size: 12px;
        font-weight: 300;
        color: #868686;
      }
    }
  }

  @media screen and (max-width: 820px) {
    ${TextBox} {
      ${CardDate} {
        order: 1;
        margin-left: 10px;
        padding-right: 26px;
      }
    }
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 15px;

  ${TextBox} {
    width: 100%;
    height: 100%;

    ${TitleBox} {
      display: flex;
      align-items: center;
      h5 {
        width: 290px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        font-weight: 700;
        color: #000;
        ${(props) =>
          props.isDisabled &&
          css`
            color: #a8a8a8;
          `}
      }
    }

    ${TextList} {
      display: flex;
      margin-top: 15px;
      p {
        font-size: 12px;
        font-weight: 400;
        color: #868686;
      }

      p:not(:last-child) {
        margin-right: 20px;
      }

      ${CategoryText} {
        font-weight: 700;
      }
    }
  }

  ${ButtonBox} {
    display: flex;
    justify-content: space-between;
    height: 60px;
    gap: 14px;
    padding: 5px 0;
    padding-left: 22px;
    border-left: 1px solid #a8a8a8;
    box-sizing: border-box;

    button {
      width: 100px;
      height: 100%;
      border: none;
      border-radius: 10px;
      outline: none;
      color: #fff;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 0;
    ${ButtonBox} {
      display: none;
    }

    ${TextBox} {
      ${TitleBox} {
        margin-top: 18px;
        h5 {
          font-size: 14px;
        }
      }

      ${TextList} {
        display: flex;
        margin-top: 17px;
        p {
          font-size: 12px;
          font-weight: 400;
        }

        p:not(:last-child) {
          margin-right: 12px;
        }

        ${CategoryText} {
          font-weight: 700;
        }
      }
    }
  }
`;
