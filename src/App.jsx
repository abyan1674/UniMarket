import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Search, 
  PlusSquare, 
  MessageCircle, 
  User, 
  ChevronLeft, 
  MapPin, 
  Camera, 
  Send, 
  Filter, 
  Heart, 
  Share2, 
  MoreHorizontal,
  ShieldCheck,
  Clock,
  CheckCircle,
  ShoppingBag,
  Settings,
  LogOut,
  Package,
  Star,
  ChevronRight,
  X,
  Image as ImageIcon
} from 'lucide-react';

// --- Mock Data (UGM / Indonesian Context) ---

const CURRENT_USER_NAME = "Yusuf Ismail";

const INITIAL_USERS = {
  "Yusuf Ismail": {
    name: "Yusuf Ismail",
    university: "Universitas Gadjah Mada",
    verified: true,
    joined: "September 2023",
    rating: 4.8,
    reviewCount: 5,
    sold: 12,
    reviews: []
  },
  "Sari W.": {
    name: "Sari W.",
    university: "Universitas Gadjah Mada",
    verified: true,
    joined: "August 2023",
    rating: 4.9,
    reviewCount: 14,
    sold: 28,
    reviews: [
      { id: 1, reviewer: "Budi S.", rating: 5, text: "Bukunya masih bagus banget, makasih kak!", date: "2 days ago" },
      { id: 2, reviewer: "Anonim", rating: 5, text: "Fast response, ramah.", date: "1 week ago" }
    ]
  },
  "Budi S.": {
    name: "Budi S.",
    university: "Universitas Negeri Yogyakarta",
    verified: true,
    joined: "July 2023",
    rating: 4.5,
    reviewCount: 8,
    sold: 15,
    reviews: [
      { id: 1, reviewer: "Sari W.", rating: 4, text: "Barang oke, cuma agak telat pas COD.", date: "1 month ago" }
    ]
  },
  "Putri A.": {
    name: "Putri A.",
    university: "Universitas Gadjah Mada",
    verified: false,
    joined: "October 2023",
    rating: 0,
    reviewCount: 0,
    sold: 0,
    reviews: []
  },
  "Dedi K.": {
    name: "Dedi K.",
    university: "Universitas Gadjah Mada",
    verified: true,
    joined: "January 2023",
    rating: 5.0,
    reviewCount: 3,
    sold: 5,
    reviews: []
  },
  "Reza M.": {
    name: "Reza M.",
    university: "Universitas Gadjah Mada",
    verified: true,
    joined: "September 2023",
    rating: 4.7,
    reviewCount: 10,
    sold: 20,
    reviews: []
  }
};

// Categories mapped to filter keys (Labels in English)
const CATEGORIES = [
  { label: "Books", value: "Books", icon: "📚" },
  { label: "Furniture", value: "Furniture", icon: "🪑" },
  { label: "Electronics", value: "Electronics", icon: "💻" },
  { label: "Clothing", value: "Clothing", icon: "👕" },
  { label: "Supplies", value: "Supplies", icon: "✏️" },
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "Kalkulus Purcell Edisi 9 (Terjemahan)",
    price: 150000,
    condition: "Good",
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
    location: "Perpusat UGM",
    seller: "Sari W.",
    sellerVerified: true,
    description: "Dipakai 1 semester untuk Matkul Dasar. Tidak ada coretan stabilo. Cover agak lecek dikit tapi isi aman.",
    posted: "2h ago"
  },
  {
    id: 2,
    title: "Meja Belajar Lipat (IKEA)",
    price: 350000,
    condition: "Like New",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400",
    location: "Pogung Baru",
    seller: "Budi S.",
    sellerVerified: true,
    description: "Mau pindahan kost, jual cepat. Mulus banget baru pake 2 bulan. Bisa COD sekitaran Pogung.",
    posted: "5h ago"
  },
  {
    id: 3,
    title: "Kalkulator Casio FX-991EX",
    price: 250000,
    condition: "Fair",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400",
    location: "Kantin Teknik (KPFT)",
    seller: "Putri A.",
    sellerVerified: false,
    description: "Fungsi normal semua, cuma tutup depannya hilang. Baterai baru diganti.",
    posted: "1d ago"
  },
  {
    id: 4,
    title: "Kulkas Mini 1 Pintu",
    price: 850000,
    condition: "Good",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=400",
    location: "Asrama Kinanti",
    seller: "Dedi K.",
    sellerVerified: true,
    description: "Dingin banget, cocok buat anak asrama. Freezer aman buat es batu.",
    posted: "3d ago"
  },
  {
    id: 5,
    title: "Kemeja Flanel Uniqlo (Size L)",
    price: 120000,
    condition: "Like New",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400",
    location: "GSP UGM",
    seller: "Reza M.",
    sellerVerified: true,
    description: "Salah beli size, kegedean. Belum pernah dipake keluar, cuma fitting doang.",
    posted: "4h ago"
  }
];

const MOCK_MESSAGES = [
  {
    id: 1,
    otherUser: "Sari W.",
    lastMessage: "Jadi ketemuan di Perpusat jam 4?",
    time: "10:30",
    unread: true,
  },
  {
    id: 2,
    otherUser: "Budi S.",
    lastMessage: "Oke mas, makasih ya mejanya!",
    time: "Yesterday",
    unread: false,
  }
];

const INITIAL_CHAT_HISTORY = [
  { id: 1, sender: "me", text: "Halo kak, bukunya masih ada?", type: "text" },
  { id: 2, sender: "Sari W.", text: "Masih kak, minat?", type: "text" },
  { id: 3, sender: "me", text: "Boleh nego jadi 130rb ga kak? Sesama anak UGM hehe", type: "text" },
  { id: 4, sender: "Sari W.", text: "Yaudah boleh deh buat kating.", type: "text" },
  { id: 5, sender: "system", type: "meetup_card", data: { location: "Perpusat UGM", time: "Today, 16:00" } },
  { id: 6, sender: "Sari W.", text: "Jadi ketemuan di Perpusat jam 4?", type: "text" }
];

// --- Utilities ---

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
};

// --- Components ---

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg shadow-teal-900/5 text-sm font-medium z-50 flex items-center gap-2 animate-fade-in-down">
      <CheckCircle size={16} className="text-teal-400" />
      {message}
    </div>
  );
};

const Avatar = ({ name, size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-24 h-24 text-2xl"
  };

  return (
    <div className={`${sizeClasses[size]} bg-teal-50 text-teal-700 rounded-full flex items-center justify-center font-bold border border-teal-100 ${className}`}>
      {name ? name.charAt(0) : <User />}
    </div>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = '', fullWidth = false, disabled = false }) => {
  const baseStyle = "px-4 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100";
  const variants = {
    primary: "bg-teal-600 text-white shadow-lg shadow-teal-200/20 hover:bg-teal-700",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    outline: "border-2 border-teal-600 text-teal-600 hover:bg-teal-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", placeholder, value, onChange, icon: Icon, textarea = false }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </div>
      )}
      {textarea ? (
        <textarea
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 block p-3 min-h-[100px]"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className={`w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 block p-3 ${Icon ? 'pl-10' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  </div>
);

const ProductCard = ({ product, onClick }) => (
  <div 
    onClick={() => onClick(product)}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 active:opacity-90 transition-opacity cursor-pointer group hover:border-teal-200 hover:shadow-md hover:shadow-teal-100/20"
  >
    <div className="relative aspect-square bg-slate-100 overflow-hidden">
      <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm text-slate-700">
        {product.condition}
      </div>
    </div>
    <div className="p-3">
      <div className="flex justify-between items-start mb-1 h-10">
        <h3 className="font-bold text-slate-900 line-clamp-2 text-sm leading-snug">{product.title}</h3>
      </div>
      <div className="flex justify-between items-end mt-2">
        <span className="text-sm font-bold text-teal-600">{formatRupiah(product.price)}</span>
        <span className="text-[10px] text-slate-500 flex items-center gap-1 max-w-[50%] truncate">
          <MapPin size={10} /> {product.location}
        </span>
      </div>
    </div>
  </div>
);

// --- Views ---

const LoginView = ({ onLogin }) => (
  <div className="flex flex-col h-full bg-white p-8 justify-center max-w-md mx-auto">
    <div className="mb-10 text-center">
      <div className="w-20 h-20 bg-teal-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-teal-200/30 rotate-3">
        <ShoppingBag className="text-white" size={40} />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Campus Market</h1>
      <p className="text-slate-500">The exclusive marketplace for verified students.</p>
    </div>

    <div className="space-y-4">
      <Input label="Student Email" placeholder="name@mail.ugm.ac.id" icon={User} />
      <Input label="Password" type="password" placeholder="••••••••" icon={ShieldCheck} />
      
      <Button onClick={onLogin} fullWidth className="mt-4">
        Sign In
      </Button>
      
      <p className="text-center text-sm text-slate-400 mt-6">
        By signing in, you agree to our <span className="text-teal-600 font-medium">Community Guidelines</span>.
      </p>
    </div>
  </div>
);

const HomeView = ({ onNavigate, onProductClick, onCategorySelect, products, currentUser }) => (
  <div className="pb-24 pt-4 px-4 max-w-md mx-auto">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hello, {currentUser.name.split(' ')[0]} 👋</h1>
        <p className="text-sm text-slate-500">{currentUser.university}</p>
      </div>
      <div onClick={() => onNavigate('profile')} className="cursor-pointer">
        <Avatar name={currentUser.name} />
      </div>
    </div>

    {/* Search Mock */}
    <div className="relative mb-8" onClick={() => onNavigate('marketplace')}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <div className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 text-slate-500 shadow-sm cursor-text hover:border-teal-300 transition-colors">
        Search for books, furniture...
      </div>
    </div>

    {/* Categories */}
    <div className="mb-8">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Categories</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.value} 
            onClick={() => onCategorySelect(cat.value)}
            className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100 group-hover:border-teal-300 group-hover:bg-teal-50 group-hover:shadow-teal-100/20 transition-all">
              {cat.icon}
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-teal-600">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Fresh Finds */}
    <div>
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-lg font-bold text-slate-900">Fresh on Campus</h2>
        <span className="text-sm text-teal-600 font-medium cursor-pointer hover:text-teal-700" onClick={() => onNavigate('marketplace')}>See all</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {products.slice(0, 4).map(p => (
          <ProductCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </div>
    </div>
  </div>
);

const MarketplaceView = ({ onProductClick, activeFilter, setActiveFilter, notify, products }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-10 border-b border-slate-100 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Marketplace</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <X size={14} />
              </button>
            )}
          </div>
          <button 
            onClick={() => notify("Filters feature coming soon!")}
            className="bg-slate-100 p-2.5 rounded-xl text-slate-600 hover:bg-slate-200 active:scale-95 transition-all"
          >
            <Filter size={20} />
          </button>
        </div>
        
        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
          <button 
            onClick={() => setActiveFilter('All')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'All' 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-200/20' 
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === cat.value 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-200/20' 
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          {activeFilter === 'All' && !searchQuery ? "Today's Recommendations" : `Results (${filteredProducts.length})`}
        </h2>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <Package size={48} className="mx-auto mb-2 opacity-50" />
            <p>No items found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AddListingView = ({ onSubmit, notify, currentUser }) => {
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  
  const [photo, setPhoto] = useState(null); // This will hold the URL
  const fileInputRef = useRef(null);

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a local URL for the uploaded file
      const url = URL.createObjectURL(file);
      setPhoto(url);
      notify("Photo uploaded successfully!");
    }
  };

  const handleList = () => {
    if (!title || !price || !category || !selectedCondition || !location || !photo) {
      notify("Please fill in all fields and add a photo.");
      return;
    }

    const newItem = {
      id: Date.now(), // Simple unique ID
      title,
      price: parseInt(price),
      condition: selectedCondition,
      category,
      image: photo,
      location,
      seller: currentUser.name,
      sellerVerified: currentUser.verified,
      description,
      posted: "Just now"
    };

    notify("Listing Posted Successfully!");
    setTimeout(() => onSubmit(newItem), 1000);
  }

  return (
    <div className="pb-24 pt-12 px-4 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Sell Item</h1>
      </div>

      <div className="space-y-6">
        {/* Photo Upload */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange} 
          />

          <div 
            onClick={handlePhotoUpload}
            className="w-32 h-40 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 shrink-0 cursor-pointer hover:bg-slate-50 transition-colors active:scale-95"
          >
            <Camera size={24} className="mb-2" />
            <span className="text-xs font-medium">Add Photos</span>
          </div>
          
          {photo && (
             <div className="w-32 h-40 bg-slate-100 rounded-2xl shrink-0 overflow-hidden relative animate-fade-in border border-slate-200">
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setPhoto(null); }}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                >
                  <X size={12}/>
                </button>
             </div>
          )}
          
          {!photo && (
             <div className="w-32 h-40 bg-slate-50 rounded-2xl shrink-0 overflow-hidden relative opacity-50 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-300">Preview</div>
             </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Input label="Title" placeholder="What are you selling?" value={title} onChange={e => setTitle(e.target.value)} />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (Rp)" placeholder="0" type="number" value={price} onChange={e => setPrice(e.target.value)} />
            <div className="mb-4">
               <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
               <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 block p-3"
               >
                 <option value="">Select...</option>
                 {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
               </select>
            </div>
          </div>

          <div className="mb-4">
             <label className="block text-sm font-medium text-slate-700 mb-1.5">Condition</label>
             <div className="flex gap-2">
               {['New', 'Like New', 'Good', 'Fair'].map(c => (
                 <button 
                   key={c} 
                   onClick={() => setSelectedCondition(c)}
                   className={`flex-1 py-2 border rounded-lg text-sm transition-colors ${
                     selectedCondition === c 
                       ? 'bg-teal-600 text-white border-teal-600' 
                       : 'border-slate-200 text-slate-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700'
                   }`}
                 >
                   {c}
                 </button>
               ))}
             </div>
          </div>

          <Input label="Description" textarea placeholder="Describe the item condition, any defects, reason for selling..." value={description} onChange={e => setDescription(e.target.value)} />
          
          <Input label="Meetup Location" placeholder="e.g. Perpusat UGM" icon={MapPin} value={location} onChange={e => setLocation(e.target.value)} />
        </div>

        <Button fullWidth onClick={handleList}>
          List Item
        </Button>
      </div>
    </div>
  );
};

const ProductDetailView = ({ product, onBack, onMessage, notify, isLiked, onToggleLike, onViewProfile }) => {
  const handleShare = () => {
    // Mock clipboard copy
    notify("Link copied to clipboard!");
  }

  const handleLike = () => {
    onToggleLike(product.id);
    notify(isLiked ? "Removed from wishlist" : "Added to wishlist");
  }

  const handleOffer = () => {
    notify("Offer sent to seller!");
  }

  const handleViewProfile = () => {
    onViewProfile(product.seller);
  }

  return (
    <div className="bg-white min-h-screen pb-24 relative animate-fade-in">
      {/* Header Actions */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between z-10 pointer-events-none">
        <button onClick={onBack} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm pointer-events-auto hover:bg-white active:scale-95 transition-all">
          <ChevronLeft size={24} className="text-slate-900" />
        </button>
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm text-slate-600 hover:bg-white active:scale-95 transition-all"
          >
            <Share2 size={20} />
          </button>
          <button 
            onClick={handleLike}
            className={`w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm transition-all active:scale-95 hover:bg-white ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`}
          >
            <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-80 bg-slate-200">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 -mt-6 bg-white rounded-t-3xl relative">
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
        
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-slate-900 w-3/4 leading-tight">{product.title}</h1>
          <span className="text-xl font-bold text-teal-600">{formatRupiah(product.price)}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">
           <span className="flex items-center gap-1"><MapPin size={14} /> {product.location}</span>
           <span className="w-1 h-1 bg-slate-300 rounded-full" />
           <span className="flex items-center gap-1"><Clock size={14} /> {product.posted}</span>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-slate-900 mb-2">Details</h3>
          <div className="flex gap-2 mb-4">
             <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-xs font-semibold">{product.condition}</span>
             <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">{CATEGORIES.find(c => c.value === product.category)?.label || product.category}</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">
            {product.description}
          </p>
        </div>

        <div className="mb-20">
          <h3 className="font-bold text-slate-900 mb-3">Seller</h3>
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
               <Avatar name={product.seller} />
               <div>
                 <div className="flex items-center gap-1">
                   <h4 className="font-bold text-slate-900">{product.seller}</h4>
                   {product.sellerVerified && <CheckCircle size={14} className="text-teal-500 fill-teal-100" />}
                 </div>
                 <div className="text-xs text-slate-500">Member since Sep 2023</div>
               </div>
            </div>
            <button 
              onClick={handleViewProfile}
              className="text-xs font-bold text-teal-600 border border-teal-200 px-3 py-1.5 rounded-lg active:scale-95 transition-transform hover:bg-teal-50"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 safe-area-bottom flex gap-3 max-w-md mx-auto">
         <Button variant="secondary" className="px-6" onClick={handleOffer}>
           Make Offer
         </Button>
         <Button className="flex-1" onClick={onMessage}>
           Chat Seller
         </Button>
      </div>
    </div>
  );
};

const MessagesListView = ({ onChatClick }) => (
  <div className="pb-24 pt-12 px-4 max-w-md mx-auto">
    <h1 className="text-2xl font-bold text-slate-900 mb-6">Messages</h1>
    
    <div className="space-y-2">
      {MOCK_MESSAGES.map(chat => (
        <div 
          key={chat.id} 
          onClick={() => onChatClick(chat)}
          className={`flex items-center gap-4 p-4 rounded-2xl transition-colors cursor-pointer active:scale-[0.98] ${chat.unread ? 'bg-teal-50 border border-teal-100' : 'bg-white hover:bg-slate-50 border border-transparent'}`}
        >
          <div className="relative">
            <Avatar name={chat.otherUser} size="lg" />
            {chat.unread && <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <h3 className={`font-semibold text-slate-900 ${chat.unread ? 'font-bold' : ''}`}>{chat.otherUser}</h3>
              <span className="text-xs text-slate-400">{chat.time}</span>
            </div>
            <p className={`text-sm truncate ${chat.unread ? 'text-teal-900 font-medium' : 'text-slate-500'}`}>
              {chat.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChatView = ({ chat, onBack, onShowMap, notify }) => {
  const [messages, setMessages] = useState(INITIAL_CHAT_HISTORY);
  const [msgText, setMsgText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!msgText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: msgText,
      type: 'text'
    };
    setMessages([...messages, newMsg]);
    setMsgText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };
  
  return (
    <div className="flex flex-col h-full bg-slate-50 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-3 border-b border-slate-100 shadow-sm sticky top-0 z-10">
        <button onClick={onBack}><ChevronLeft size={24} className="text-slate-600" /></button>
        <Avatar name={chat?.otherUser} />
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 leading-none mb-1">{chat?.otherUser || "Sari W."}</h3>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Online
          </p>
        </div>
        <button 
          onClick={() => notify("Chat options coming soon")}
          className="p-2 text-slate-400 hover:bg-slate-50 rounded-full"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => {
          if (msg.type === 'meetup_card') {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 w-full max-w-xs">
                  <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
                    <ShieldCheck size={16} className="text-teal-600" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Safe Meetup Proposed</span>
                  </div>
                  <div className="flex gap-3 items-start mb-3">
                    <div className="bg-teal-50 p-2.5 rounded-xl text-teal-600">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{msg.data.location}</h4>
                      <p className="text-xs text-slate-500">{msg.data.time}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full py-2 text-sm" onClick={onShowMap}>View Map</Button>
                </div>
              </div>
            );
          }
          
          const isMe = msg.sender === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                isMe ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white p-3 border-t border-slate-100 flex items-center gap-2">
        <button 
          onClick={() => notify("Attachments coming soon")}
          className="p-2 text-slate-400 hover:bg-slate-50 rounded-full active:scale-95 transition-transform"
        >
          <PlusSquare size={24} />
        </button>
        <div className="flex-1 bg-slate-100 rounded-full px-4 py-2 flex items-center">
          <input 
            className="bg-transparent w-full text-sm focus:outline-none placeholder-slate-400 text-slate-900" 
            placeholder="Type a message..."
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button 
          onClick={handleSend}
          disabled={!msgText.trim()}
          className={`p-2 rounded-full transition-colors active:scale-95 transform ${
            msgText.trim() ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

const PickupMapView = ({ onBack, notify }) => (
  <div className="h-full relative bg-slate-200">
    <div className="absolute top-0 left-0 right-0 p-4 z-10">
       <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform">
         <ChevronLeft size={24} />
       </button>
    </div>
    
    {/* Real Google Map Embed */}
    <iframe 
      width="100%" 
      height="100%" 
      id="gmap_canvas" 
      src="https://maps.google.com/maps?q=Perpustakaan+Pusat+UGM&t=&z=17&ie=UTF8&iwloc=&output=embed" 
      frameBorder="0" 
      scrolling="no" 
      marginHeight="0" 
      marginWidth="0"
      className="w-full h-full opacity-90"
      title="Google Maps"
    ></iframe>

    {/* Bottom Sheet */}
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
      <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
      <h2 className="text-lg font-bold text-slate-900 mb-1">Confirm Meetup</h2>
      <p className="text-sm text-slate-500 mb-6">Meet Sari W. at Perpusat UGM</p>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="block text-xs text-slate-400 font-bold uppercase mb-1">Time</span>
          <span className="block text-slate-900 font-semibold">16:00 WIB</span>
        </div>
        <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="block text-xs text-slate-400 font-bold uppercase mb-1">Distance</span>
          <span className="block text-slate-900 font-semibold">0.4 km</span>
        </div>
      </div>

      <Button fullWidth onClick={() => notify("Location sent to chat!")}>
        Send Location
      </Button>
    </div>
  </div>
);

const FilteredProductListView = ({ title, products, onBack, onProductClick }) => (
  <div className="pb-24 pt-4 px-4 max-w-md mx-auto min-h-screen bg-slate-50">
    <div className="flex items-center gap-3 mb-6">
      <button onClick={onBack} className="w-8 h-8 flex items-center justify-center -ml-2 text-slate-600">
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
    </div>

    {products.length > 0 ? (
      <div className="grid grid-cols-2 gap-4">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </div>
    ) : (
      <div className="text-center py-20 text-slate-400">
        <Package size={48} className="mx-auto mb-2 opacity-50" />
        <p>No items found.</p>
      </div>
    )}
  </div>
);

const ProfileView = ({ onLogout, notify, onNavigate, currentUser }) => {
  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Avatar name={currentUser.name} size="xl" />
          {currentUser.verified && (
            <div className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full border-4 border-white shadow-sm" title="Verified Student">
              <ShieldCheck size={16} />
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{currentUser.name}</h1>
        <p className="text-sm text-slate-500 mb-2">{currentUser.university}</p>
        <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
          <CheckCircle size={12} /> Verified Student
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
          <span className="text-2xl font-bold text-slate-900 mb-1">{currentUser.sold}</span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Sold</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-2xl font-bold text-slate-900">{currentUser.rating}</span>
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Rating</span>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-3">
        <button 
          onClick={() => onNavigate('my-listings')}
          className="w-full bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors active:scale-[0.99] group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 text-slate-600 rounded-lg group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
              <Package size={20} />
            </div>
            <span className="font-medium text-slate-700">My Listings</span>
          </div>
          <ChevronRight size={20} className="text-slate-300 group-hover:text-teal-400" />
        </button>

        <button 
          onClick={() => onNavigate('liked-items')}
          className="w-full bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors active:scale-[0.99] group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 text-slate-600 rounded-lg group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
              <Heart size={20} />
            </div>
            <span className="font-medium text-slate-700">Liked Items</span>
          </div>
          <ChevronRight size={20} className="text-slate-300 group-hover:text-teal-400" />
        </button>

        <button 
          onClick={() => notify("Settings coming soon...")}
          className="w-full bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors active:scale-[0.99] group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 text-slate-600 rounded-lg group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
              <Settings size={20} />
            </div>
            <span className="font-medium text-slate-700">Account Settings</span>
          </div>
          <ChevronRight size={20} className="text-slate-300 group-hover:text-teal-400" />
        </button>
        
        <button onClick={onLogout} className="w-full bg-red-50 p-4 rounded-xl border border-red-100 flex items-center gap-3 hover:bg-red-100 transition-colors mt-6 active:scale-[0.99]">
          <div className="p-2 bg-white text-red-500 rounded-lg">
            <LogOut size={20} />
          </div>
          <span className="font-medium text-red-600">Log Out</span>
        </button>
      </div>
    </div>
  );
};

const PublicProfileView = ({ user, onBack, onAddReview, currentUser }) => {
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleSubmit = () => {
    if (!newReviewText.trim()) return;
    onAddReview(user.name, {
      reviewer: currentUser.name,
      rating: newReviewRating,
      text: newReviewText,
      date: "Just now"
    });
    setNewReviewText('');
  };

  if (!user) return <div className="p-10 text-center">User not found</div>;

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto min-h-screen bg-slate-50">
       <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center -ml-2 text-slate-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Profile</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
         <div className="text-center mb-6">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <Avatar name={user.name} size="xl" />
            {user.verified && (
              <div className="absolute bottom-0 right-0 bg-teal-600 text-white p-1 rounded-full border-4 border-white shadow-sm" title="Verified Student">
                <ShieldCheck size={14} />
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
          <p className="text-xs text-slate-500 mb-2">{user.university}</p>
          <div className="flex justify-center gap-2">
             {user.verified && (
               <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <CheckCircle size={10} /> Verified
               </span>
             )}
             <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                Joined {user.joined}
             </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
           <div className="text-center">
              <span className="block text-lg font-bold text-slate-900">{user.sold}</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sold</span>
           </div>
           <div className="text-center border-x border-slate-100">
              <span className="block text-lg font-bold text-slate-900">{user.rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Rating</span>
           </div>
           <div className="text-center">
              <span className="block text-lg font-bold text-slate-900">{user.reviewCount}</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Reviews</span>
           </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          Reviews 
          <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">{user.reviews.length}</span>
        </h3>
        
        {user.reviews.length > 0 ? (
          <div className="space-y-3">
            {user.reviews.map((review, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-2">
                     <Avatar name={review.reviewer} size="sm" />
                     <span className="text-sm font-bold text-slate-900">{review.reviewer}</span>
                   </div>
                   <span className="text-xs text-slate-400">{review.date}</span>
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < review.rating ? "fill-current" : "text-slate-200"} />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl border border-slate-100 border-dashed">
            <p className="text-slate-400 text-sm">No reviews yet.</p>
          </div>
        )}
      </div>

      {/* Add Review Form (Only if not own profile) */}
      {user.name !== currentUser.name && (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-3">Leave a Rating</h3>
          <div className="flex gap-2 mb-4 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                onClick={() => setNewReviewRating(star)}
                className={`transition-transform active:scale-90 ${star <= newReviewRating ? 'text-yellow-400' : 'text-slate-200'}`}
              >
                <Star size={32} className="fill-current" />
              </button>
            ))}
          </div>
          <textarea 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none mb-3 min-h-[80px]"
            placeholder="Write your experience..."
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
          />
          <Button fullWidth onClick={handleSubmit} disabled={!newReviewText.trim()}>
            Submit Review
          </Button>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [view, setView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [notification, setNotification] = useState(null);

  // Global State for Dynamic Data
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [likedItems, setLikedItems] = useState(new Set()); 
  
  // User Database State
  const [users, setUsers] = useState(INITIAL_USERS);
  const [viewingProfileId, setViewingProfileId] = useState(null);

  const currentUser = users[CURRENT_USER_NAME];

  const notify = (msg) => {
    setNotification(msg);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('login');
    setActiveCategory('All');
    notify("Logged out successfully");
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setView('marketplace');
  };

  const handleNavigate = (target) => {
    if (target === 'marketplace') {
      setActiveCategory('All'); 
    }
    setView(target);
  }

  const handleAddToMarket = (newItem) => {
    setProducts([newItem, ...products]);
    setView('home');
  }

  const handleToggleLike = (productId) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }

  const handleViewUserProfile = (username) => {
    if (!users[username]) {
       // Create a fallback user if they don't exist in our DB yet
       setUsers(prev => ({
         ...prev,
         [username]: {
           name: username,
           university: "University Student",
           verified: false,
           joined: "Recently",
           rating: 0,
           reviewCount: 0,
           sold: 0,
           reviews: []
         }
       }));
    }
    setViewingProfileId(username);
    setView('public-profile');
  };

  const handleAddReview = (username, reviewData) => {
    setUsers(prev => {
      const targetUser = prev[username];
      const newReviews = [reviewData, ...targetUser.reviews];
      // Recalculate rating
      const totalRating = newReviews.reduce((sum, r) => sum + r.rating, 0);
      const newRating = totalRating / newReviews.length;
      
      return {
        ...prev,
        [username]: {
          ...targetUser,
          reviews: newReviews,
          rating: newRating,
          reviewCount: newReviews.length
        }
      };
    });
    notify("Review submitted!");
  };

  // Simple Router Switch
  const renderView = () => {
    switch(view) {
      case 'login':
        return <LoginView onLogin={handleLogin} />;
      case 'home':
        return (
          <HomeView 
            onNavigate={handleNavigate} 
            onProductClick={(p) => { setSelectedProduct(p); setView('product-detail'); }}
            onCategorySelect={handleCategorySelect}
            products={products}
            currentUser={currentUser}
          />
        );
      case 'marketplace':
        return (
          <MarketplaceView 
            onProductClick={(p) => { setSelectedProduct(p); setView('product-detail'); }} 
            activeFilter={activeCategory}
            setActiveFilter={setActiveCategory}
            notify={notify}
            products={products}
          />
        );
      case 'add-listing':
        return <AddListingView onSubmit={handleAddToMarket} notify={notify} currentUser={currentUser} />;
      case 'inbox':
        return <MessagesListView onChatClick={(c) => { setSelectedChat(c); setView('chat'); }} />;
      case 'product-detail':
        return (
          <ProductDetailView 
            product={selectedProduct} 
            onBack={() => setView('home')} 
            onMessage={() => { setSelectedChat({}); setView('chat'); }} 
            notify={notify}
            isLiked={likedItems.has(selectedProduct?.id)}
            onToggleLike={handleToggleLike}
            onViewProfile={handleViewUserProfile}
          />
        );
      case 'chat':
        return <ChatView chat={selectedChat} onBack={() => setView('inbox')} onShowMap={() => setView('pickup')} notify={notify} />;
      case 'pickup':
        return <PickupMapView onBack={() => setView('chat')} notify={notify} />;
      case 'profile':
        return <ProfileView onLogout={handleLogout} notify={notify} onNavigate={handleNavigate} currentUser={currentUser} />;
      case 'public-profile':
        return (
          <PublicProfileView 
            user={users[viewingProfileId]} 
            onBack={() => setView('home')} // Or back to wherever we came from, simplifying to home/product for now
            onAddReview={handleAddReview}
            currentUser={currentUser}
          />
        );
      case 'my-listings':
        return (
          <FilteredProductListView 
            title="My Listings" 
            products={products.filter(p => p.seller === currentUser.name)}
            onBack={() => setView('profile')}
            onProductClick={(p) => { setSelectedProduct(p); setView('product-detail'); }}
          />
        );
      case 'liked-items':
        return (
           <FilteredProductListView 
            title="Liked Items" 
            products={products.filter(p => likedItems.has(p.id))}
            onBack={() => setView('profile')}
            onProductClick={(p) => { setSelectedProduct(p); setView('product-detail'); }}
          />
        );
      default:
        return <HomeView currentUser={currentUser} />;
    }
  };

  const NavItem = ({ icon: Icon, label, target, active }) => (
    <button 
      onClick={() => handleNavigate(target)}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  return (
    <div className="bg-slate-100 min-h-screen flex justify-center overflow-hidden font-sans">
      <div className="w-full max-w-md bg-white h-screen shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* Notification Toast */}
        {notification && <Toast message={notification} onClose={() => setNotification(null)} />}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
          {renderView()}
        </div>

        {/* Bottom Navigation */}
        {isLoggedIn && !['product-detail', 'chat', 'pickup'].includes(view) && (
          <div className="bg-white border-t border-slate-100 px-6 py-3 pb-6 flex justify-between items-center absolute bottom-0 w-full z-20">
            <NavItem icon={Home} label="Home" target="home" active={view === 'home'} />
            <NavItem icon={Search} label="Browse" target="marketplace" active={view === 'marketplace'} />
            
            <div className="relative -top-5">
              <button 
                onClick={() => setView('add-listing')}
                className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-teal-200/20 hover:bg-teal-700 transition-colors active:scale-95"
              >
                <PlusSquare size={28} />
              </button>
            </div>

            <NavItem icon={MessageCircle} label="Inbox" target="inbox" active={view === 'inbox'} />
            <NavItem icon={User} label="Profile" target="profile" active={view === 'profile'} />
          </div>
        )}

      </div>
    </div>
  );
}