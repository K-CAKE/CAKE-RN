export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      chat: {
        Row: {
          chat_room: number;
          chatting: string | null;
          created_at: string;
          id: number;
          is_user1: boolean | null;
        };
        Insert: {
          chat_room: number;
          chatting?: string | null;
          created_at?: string;
          id?: number;
          is_user1?: boolean | null;
        };
        Update: {
          chat_room?: number;
          chatting?: string | null;
          created_at?: string;
          id?: number;
          is_user1?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_chat_room_fkey';
            columns: ['chat_room'];
            isOneToOne: false;
            referencedRelation: 'chat_room';
            referencedColumns: ['id'];
          },
        ];
      };
      chat_room: {
        Row: {
          created_at: string;
          id: number;
          user1: number | null;
          user2: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          user1?: number | null;
          user2?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          user1?: number | null;
          user2?: number | null;
        };
        Relationships: [];
      };
      food_receipt_file: {
        Row: {
          food_file_id: number;
          food_receipt_serial: string;
          food_request_id: number;
          food_store_name: string;
          foreigner_id: number;
        };
        Insert: {
          food_file_id?: number;
          food_receipt_serial: string;
          food_request_id?: number;
          food_store_name: string;
          foreigner_id?: number;
        };
        Update: {
          food_file_id?: number;
          food_receipt_serial?: string;
          food_request_id?: number;
          food_store_name?: string;
          foreigner_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'food_receipt_file_food_request_id_fkey';
            columns: ['food_request_id'];
            isOneToOne: true;
            referencedRelation: 'food_request_history';
            referencedColumns: ['food_request_id'];
          },
          {
            foreignKeyName: 'food_receipt_file_foreigner_id_fkey';
            columns: ['foreigner_id'];
            isOneToOne: true;
            referencedRelation: 'foreigner';
            referencedColumns: ['foreigner_id'];
          },
        ];
      };
      food_request_history: {
        Row: {
          food_payment: number;
          food_request_id: number;
          food_request_name: string;
          foreigner_id: number;
          korean_fee: number;
          korean_id: number;
          processing_date: string;
          request_price: number;
          request_state: string;
          serial_number: string;
        };
        Insert: {
          food_payment: number;
          food_request_id?: number;
          food_request_name: string;
          foreigner_id?: number;
          korean_fee: number;
          korean_id?: number;
          processing_date: string;
          request_price: number;
          request_state: string;
          serial_number: string;
        };
        Update: {
          food_payment?: number;
          food_request_id?: number;
          food_request_name?: string;
          foreigner_id?: number;
          korean_fee?: number;
          korean_id?: number;
          processing_date?: string;
          request_price?: number;
          request_state?: string;
          serial_number?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'food_request_history_foreigner_id_fkey';
            columns: ['foreigner_id'];
            isOneToOne: false;
            referencedRelation: 'foreigner';
            referencedColumns: ['foreigner_id'];
          },
          {
            foreignKeyName: 'food_request_history_korean_id_fkey';
            columns: ['korean_id'];
            isOneToOne: false;
            referencedRelation: 'korean';
            referencedColumns: ['korean_id'];
          },
        ];
      };
      foreigner: {
        Row: {
          foreigner_id: number;
          history_id: number | null;
          point_id: number;
          region: number;
          user_email: string;
          user_name: string;
          user_password: string;
        };
        Insert: {
          foreigner_id?: number;
          history_id?: number | null;
          point_id?: number;
          region: number;
          user_email: string;
          user_name: string;
          user_password: string;
        };
        Update: {
          foreigner_id?: number;
          history_id?: number | null;
          point_id?: number;
          region?: number;
          user_email?: string;
          user_name?: string;
          user_password?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'foreigner_point_id_fkey';
            columns: ['point_id'];
            isOneToOne: true;
            referencedRelation: 'point';
            referencedColumns: ['point_id'];
          },
        ];
      };
      Foreigner_NOTME: {
        Row: {
          created_at: string;
          ForeignerId: number;
          Password: string;
          Point: number;
          Region: number;
          UserEmail: string;
          UserName: string;
        };
        Insert: {
          created_at?: string;
          ForeignerId?: number;
          Password: string;
          Point: number;
          Region: number;
          UserEmail: string;
          UserName: string;
        };
        Update: {
          created_at?: string;
          ForeignerId?: number;
          Password?: string;
          Point?: number;
          Region?: number;
          UserEmail?: string;
          UserName?: string;
        };
        Relationships: [];
      };
      korean: {
        Row: {
          history_id: number | null;
          korean_id: number;
          point_id: number;
          region: number;
          user_email: string;
          user_name: string;
          user_password: string;
        };
        Insert: {
          history_id?: number | null;
          korean_id?: number;
          point_id?: number;
          region: number;
          user_email: string;
          user_name: string;
          user_password: string;
        };
        Update: {
          history_id?: number | null;
          korean_id?: number;
          point_id?: number;
          region?: number;
          user_email?: string;
          user_name?: string;
          user_password?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'korean_point_id_fkey';
            columns: ['point_id'];
            isOneToOne: true;
            referencedRelation: 'point';
            referencedColumns: ['point_id'];
          },
        ];
      };
      point: {
        Row: {
          current_point: number | null;
          point_id: number;
        };
        Insert: {
          current_point?: number | null;
          point_id?: number;
        };
        Update: {
          current_point?: number | null;
          point_id?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      taxi_capture_file: {
        Row: {
          foreigner_id: number;
          taxi_file_id: number;
          taxi_license_plate: string;
          taxi_request_id: number;
          taxi_serial: string;
        };
        Insert: {
          foreigner_id?: number;
          taxi_file_id?: number;
          taxi_license_plate: string;
          taxi_request_id?: number;
          taxi_serial: string;
        };
        Update: {
          foreigner_id?: number;
          taxi_file_id?: number;
          taxi_license_plate?: string;
          taxi_request_id?: number;
          taxi_serial?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'taxi_capture_file_foreigner_id_fkey';
            columns: ['foreigner_id'];
            isOneToOne: true;
            referencedRelation: 'foreigner';
            referencedColumns: ['foreigner_id'];
          },
          {
            foreignKeyName: 'taxi_capture_file_taxi_request_id_fkey';
            columns: ['taxi_request_id'];
            isOneToOne: true;
            referencedRelation: 'taxi_request_history';
            referencedColumns: ['taxi_request_id'];
          },
        ];
      };
      taxi_request_history: {
        Row: {
          arrival_point: string;
          estimated_arrival_time: string;
          foreigner_id: number;
          korean_fee: number;
          korean_id: number;
          processing_date: string;
          request_price: number;
          request_state: number;
          serial_number: string;
          starting_point: string;
          taxi_payment: number;
          taxi_request_id: number;
          taxi_request_name: string;
        };
        Insert: {
          arrival_point: string;
          estimated_arrival_time: string;
          foreigner_id?: number;
          korean_fee: number;
          korean_id?: number;
          processing_date: string;
          request_price: number;
          request_state: number;
          serial_number: string;
          starting_point: string;
          taxi_payment: number;
          taxi_request_id?: number;
          taxi_request_name: string;
        };
        Update: {
          arrival_point?: string;
          estimated_arrival_time?: string;
          foreigner_id?: number;
          korean_fee?: number;
          korean_id?: number;
          processing_date?: string;
          request_price?: number;
          request_state?: number;
          serial_number?: string;
          starting_point?: string;
          taxi_payment?: number;
          taxi_request_id?: number;
          taxi_request_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'taxi_request_history_foreigner_id_fkey';
            columns: ['foreigner_id'];
            isOneToOne: true;
            referencedRelation: 'foreigner';
            referencedColumns: ['foreigner_id'];
          },
          {
            foreignKeyName: 'taxi_request_history_korean_id_fkey';
            columns: ['korean_id'];
            isOneToOne: true;
            referencedRelation: 'korean';
            referencedColumns: ['korean_id'];
          },
        ];
      };
      usage_history: {
        Row: {
          file_id: number;
          payment: number;
          payment_processor: string;
          point_id: number;
          usage_id: number;
        };
        Insert: {
          file_id?: number;
          payment: number;
          payment_processor: string;
          point_id?: number;
          usage_id?: number;
        };
        Update: {
          file_id?: number;
          payment?: number;
          payment_processor?: string;
          point_id?: number;
          usage_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'usage_history_file_id_fkey';
            columns: ['file_id'];
            isOneToOne: true;
            referencedRelation: 'taxi_capture_file';
            referencedColumns: ['taxi_file_id'];
          },
          {
            foreignKeyName: 'usage_history_point_id_fkey';
            columns: ['point_id'];
            isOneToOne: true;
            referencedRelation: 'point';
            referencedColumns: ['point_id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
