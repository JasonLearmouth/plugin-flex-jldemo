import React, { useEffect, useState } from 'react';
import { Box, Stack, Badge, SkeletonLoader } from '@twilio-paste/core';

import SegmentService from '../../utils/SegmentService/SegmentService';

import { SegmentTraits } from '../../types/Segment/SegmentTraits';
import { withTaskContext } from '@twilio/flex-ui';
import { BadgeVariants } from '@twilio-paste/badge/dist/types';
import { KnownTraits } from '../../flex-hooks/strings/segmentTraits';

type Props = {
  task?: any;
};

type TraitBadges = { value: string; variant: BadgeVariants };

const makeBadges = (traits: any) => {
  const badges: TraitBadges[] = [];

  console.log(`Evaluating traits`, traits);

  KnownTraits.forEach((item) => {
    console.log(`Evaluating know trait against ${item.key} `);
    if (traits && traits.hasOwnProperty(item.key)) {
      if (item.display_value == true) {
        badges.push({
          value: item.label + ': ' + traits[item.key],
          variant: item.variant,
        });
      } else {
        if (item.onlyIfTrue === true && traits[item.key] === false) {
          // Skip
        } else {
          badges.push({ value: item.label, variant: item.variant });
        }
      }
    }
  });
  console.log(`Total badges (traits) to display ${badges.length} `);
  return badges;
};

const TraitTags = (props: Props) => {
  const [traits, setTraits] = useState({} as SegmentTraits);
  const [loading, setLoading] = useState(true);
  const [traitBadges, setTraitBadges] = useState<TraitBadges[]>();

  useEffect(() => {
    async function getTraits() {
      if (props.task?.attributes?.email) {
        const traitsObj = await SegmentService.getTraitsForUser(props.task.attributes.email);
        setTraits(traitsObj);
        setTraitBadges(makeBadges(traitsObj));
      }
      setLoading(false);
    }
    getTraits();
  }, []);

  if (loading)
    return (
      <Stack orientation={'vertical'} spacing={'space70'}>
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </Stack>
    );

  return (
    <Box display="flex" columnGap="space40" rowGap="space60" flexWrap="wrap">
      {traitBadges?.map((badge, idx: number) => (
        <Badge as="span" variant={badge.variant} key={idx}>
          {badge.value}
        </Badge>
      ))}
    </Box>
  );
};

export default withTaskContext(TraitTags);
