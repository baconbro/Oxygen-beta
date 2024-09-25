import React from 'react';
import PropTypes from 'prop-types';
import { xor } from 'lodash';

import {
  Filters,
  SearchInput,
  Avatars,
  AvatarIsActiveBorder,
  StyledAvatar,
  StyledButton,
  ClearAll,
} from './Styles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  defaultFilters: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired,
};

const ProjectBoardFilters = ({ projectUsers, defaultFilters, filters, mergeFilters }) => {
  const { searchTerm, userIds, myOnly, recent } = filters;

  const areFiltersCleared = !searchTerm && userIds.length === 0 && !myOnly && !recent;

  return (
    <div className="d-flex flex-wrap flex-stack pb-7">
      <Filters data-testid="board-filters">
        <SearchInput
          icon="search"
          value={searchTerm}
          onChange={value => mergeFilters({ searchTerm: value })}
          placeholder='Search'
        />
        <Avatars>
          {projectUsers.map(user => (
            <AvatarIsActiveBorder key={user.id} isActive={userIds.includes(user.id)}>
              <StyledAvatar
                avatarUrl={user.avatarUrl}
                name={user.name}
                onClick={() => mergeFilters({ userIds: xor(userIds, [user.id]) })}
              />
            </AvatarIsActiveBorder>
          ))}
        </Avatars>
        <StyledButton
          variant="empty"
          isActive={recent}
          onClick={() => mergeFilters({ recent: !recent })}
        >
          Recently Updated
        </StyledButton>
        {!areFiltersCleared && (
          <ClearAll onClick={() => mergeFilters(defaultFilters)}>Clear all</ClearAll>
        )}
      </Filters>
    </div>
  );
};

ProjectBoardFilters.propTypes = propTypes;

export default ProjectBoardFilters;
