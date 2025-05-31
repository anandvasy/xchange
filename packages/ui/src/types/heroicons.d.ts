declare module '@heroicons/react/24/outline' {
  import { ComponentProps, FC } from 'react';

  export interface IconProps extends ComponentProps<'svg'> {
    title?: string;
    titleId?: string;
  }

  export const HomeIcon: FC<IconProps>;
  export const UserGroupIcon: FC<IconProps>;
  export const ChatBubbleLeftRightIcon: FC<IconProps>;
  export const BellIcon: FC<IconProps>;
  export const UserCircleIcon: FC<IconProps>;
  export const ChatBubbleLeftIcon: FC<IconProps>;
  export const HandThumbUpIcon: FC<IconProps>;
  export const MagnifyingGlassIcon: FC<IconProps>;
  export const UsersIcon: FC<IconProps>;
} 