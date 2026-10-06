export interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: 'urgent' | 'important' | 'info';
  is_popup: boolean;
  is_active: boolean;
  created_at: string;
  author: string;
}

export interface MediaDisplayItem {
  id: number;
  title: string;
  type: 'image' | 'video';
  media_url: string;
  thumbnail_url?: string;
  duration_seconds: number;
  is_active: boolean;
  order_index: number;
}

export interface DisplaySetting {
  id?: number;
  office_name: string;
  office_subname: string;
  office_address: string;
  slide_interval_seconds: number;
  enable_audio_chime: boolean;
  running_text: string;
  theme_color?: string;
  media_view_mode?: 'cinematic' | 'fullscreen_media' | 'split_media_info';
  auto_play_video?: boolean;
  video_sound_muted?: boolean;
}

export interface DatabaseStatus {
  type: 'mysql' | 'local_fallback';
  connected: boolean;
  host: string;
  database: string;
  user: string;
  port: number;
  message: string;
}
