import moment from 'moment';

export const getUpdateAtLabel = (updateAt?: string) => {
  let updateAtLabel = '';
  const diffD = moment().diff(moment(updateAt), 'days');
  const diffH = moment().diff(moment(updateAt), 'hours');
  const diffM = moment().diff(moment(updateAt), 'minutes');
  const diffS = moment().diff(moment(updateAt), 'seconds');
  if (diffD > 7) {
    updateAtLabel = moment(updateAt).format('YYYY-MM-DD HH:mm:ss');
  } else if (diffD > 0) {
    updateAtLabel = `${diffD}天前`;
  } else if (diffH > 0) {
    updateAtLabel = `${diffH}小时前`;
  } else if (diffM > 0) {
    updateAtLabel = `${diffM}分钟前`;
  } else {
    updateAtLabel = diffS ? `${diffS}秒前` : '刚刚';
  }
  return updateAtLabel;
};