import '../../../../styles/Users/points.modle.scss';
import PointGroup from './PointGroup/PointGroup';
import List from './List/List';

const Points = () => {
  return (
    <>
    <h3>我的點數</h3>
      <PointGroup />
      <List />
    </>
  );
};

export default Points;
