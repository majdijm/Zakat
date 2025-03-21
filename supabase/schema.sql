-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  preferred_currency TEXT DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assets table for user assets
CREATE TABLE IF NOT EXISTS public.assets (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  value DECIMAL(15, 2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create zakat_calculations table for historical zakat calculations
CREATE TABLE IF NOT EXISTS public.zakat_calculations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  calculation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_assets DECIMAL(15, 2) NOT NULL,
  nisab_value DECIMAL(15, 2) NOT NULL,
  zakat_amount DECIMAL(15, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gold_prices table for tracking gold prices
CREATE TABLE IF NOT EXISTS public.gold_prices (
  id UUID PRIMARY KEY,
  price_per_gram DECIMAL(15, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS) policies

-- Profiles: Users can only read and update their own profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Assets: Users can only CRUD their own assets
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own assets" 
  ON public.assets FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assets" 
  ON public.assets FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assets" 
  ON public.assets FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assets" 
  ON public.assets FOR DELETE 
  USING (auth.uid() = user_id);

-- Zakat Calculations: Users can only CRUD their own calculations
ALTER TABLE public.zakat_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own zakat calculations" 
  ON public.zakat_calculations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own zakat calculations" 
  ON public.zakat_calculations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own zakat calculations" 
  ON public.zakat_calculations FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own zakat calculations" 
  ON public.zakat_calculations FOR DELETE 
  USING (auth.uid() = user_id);

-- Gold Prices: All users can view, but only admins can modify
ALTER TABLE public.gold_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view gold prices" 
  ON public.gold_prices FOR SELECT 
  USING (true);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default gold price if table is empty
INSERT INTO public.gold_prices (id, price_per_gram, currency)
SELECT 
  gen_random_uuid(), 
  65.00, 
  'USD'
WHERE NOT EXISTS (SELECT 1 FROM public.gold_prices);
