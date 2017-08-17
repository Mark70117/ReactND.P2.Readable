import React from 'react';
import { getPostsIdComments } from '../utils/api';

export const getAppropriateComment = (postId, mergeComments) => {
  getPostsIdComments(postId).then(comments => {
    mergeComments(comments);
  });
};

const makeIdKey = (total, element) => {
  if (element.id) {
    const existingTimestamp = total[element.id]
      ? total[element.id].timestamp
      : -1;
    const existingVoteScore = total[element.id]
      ? total[element.id].voteScore
      : 'NaN';

    if (element.timestamp > existingTimestamp) {
      return { ...total, [element.id]: element };
    } else if (element.voteScore !== existingVoteScore) {
      return { ...total, [element.id]: element };
    } else {
      return total;
    }
  } else {
    return total;
  }
};

export const sync = (prevPostDict, postArr) => {
  const postDict = postArr.reduce(makeIdKey, prevPostDict);
  return postDict;
};

export const sortVoteAscending = (a, b) => a.voteScore > b.voteScore;
export const sortVoteDecending = (a, b) => a.voteScore < b.voteScore;
export const sortTimestampAscending = (a, b) => a.timestamp > b.timestamp;
export const sortTimeStampDecending = (a, b) => a.timestamp < b.timestamp;

export const sortOrderStringToFunc = sortOrderStr => {
  switch (sortOrderStr) {
    case 'sortVoteAscending':
      return sortVoteAscending;
    case 'sortVoteDecending':
      return sortVoteDecending;
    case 'sortTimestampAscending':
      return sortTimestampAscending;
    case 'sortTimeStampDecending':
      return sortTimeStampDecending;
    default:
      return sortVoteAscending;
  }
};

export const sortOrderInitialState = {
  str: 'sortVoteDecending',
  func: sortVoteDecending,
};

//http://redux-form.com/6.4.3/examples/fieldLevelValidation/
export const required = value => (value ? undefined : 'Required');
export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>;
