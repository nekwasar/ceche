package scanner

var builtinWords = []string{
	"go", "app", "web", "data", "net", "cloud", "tech", "dev", "hub", "lab",
	"box", "top", "pro", "max", "one", "ai", "api", "bit", "pay", "buy",
	"sell", "shop", "store", "market", "trade", "crypto", "block", "chain",
	"meta", "open", "fast", "quick", "easy", "smart", "blue", "prime",
	"ultra", "mega", "super", "pulse", "spark", "flow", "sync", "core",
	"base", "flex", "zoom", "wave", "access", "account", "agent", "analytics",
	"archive", "audio", "auto", "backend", "bank", "bill", "book", "build",
	"business", "calendar", "camp", "capital", "card", "care", "career", "cash",
	"chat", "check", "city", "class", "clean", "click", "client", "club",
	"code", "college", "commerce", "company", "connect", "consulting", "contact",
	"control", "cook", "copy", "creative", "cube", "currency", "customer",
	"dance", "deal", "design", "digital", "direct", "docs", "domain", "drive",
	"drop", "earn", "education", "electric", "email", "engage", "engine",
	"enterprise", "event", "exchange", "express", "farm", "finance", "fit",
	"fitness", "food", "foot", "frame", "fresh", "fund", "fusion", "game",
	"gear", "gift", "global", "golf", "good", "green", "group", "growth",
	"guard", "guide", "guru", "gym", "health", "heart", "home", "hook",
	"host", "house", "hunt", "ice", "idea", "image", "inbox", "india",
	"ink", "input", "insight", "instinct", "institute", "insurance", "intern",
	"invest", "island", "jet", "job", "join", "journal", "joy", "jump",
	"justice", "keep", "key", "kid", "kitchen", "lab", "land", "law",
	"lawyer", "lead", "learn", "legal", "life", "light", "link", "list",
	"live", "loan", "local", "lock", "logo", "love", "mail", "main",
	"manage", "map", "margin", "mark", "market", "media", "meet", "menu",
	"merge", "metal", "mind", "mix", "mobile", "mode", "money", "moon",
	"mortgage", "motor", "music", "net", "network", "news", "next", "node",
	"note", "office", "online", "open", "option", "oracle", "order", "organ",
	"page", "paint", "pan", "park", "partner", "path", "pay", "peer",
	"phone", "photo", "piano", "pic", "plan", "play", "pod", "point",
	"pool", "pop", "power", "press", "price", "print", "privacy", "private",
	"profit", "project", "promo", "property", "public", "publish", "quest",
	"quote", "radio", "range", "rate", "read", "real", "record", "recruit",
	"rent", "report", "research", "resource", "rest", "retail", "review",
	"ride", "risk", "robot", "rock", "role", "room", "root", "route",
	"run", "safe", "sale", "salt", "sand", "save", "scan", "school",
	"score", "search", "secure", "select", "serve", "service", "session",
	"set", "share", "ship", "shop", "show", "side", "site", "smart",
	"snap", "social", "solar", "solution", "sonic", "source", "space",
	"sport", "spot", "stage", "start", "state", "stock", "store", "stream",
	"studio", "style", "supply", "support", "sync", "system", "tab", "talk",
	"target", "task", "tax", "team", "tech", "term", "test", "text",
	"time", "tip", "today", "tool", "top", "tour", "town", "track",
	"trade", "train", "trend", "trip", "truck", "trust", "tube", "tune",
	"tv", "university", "up", "value", "video", "view", "village",
	"vinyl", "visa", "vision", "voice", "volume", "vote", "wage", "watch",
	"water", "wave", "web", "week", "weight", "wheel", "win", "wire",
	"wise", "work", "world", "zone",
}

func GetBuiltinWords() []string {
	return builtinWords
}

func GetWordListByName(name string) []string {
	switch name {
	case "builtin", "common", "default":
		return builtinWords
	case "tech":
		return techWords
	case "business":
		return businessWords
	case "creative":
		return creativeWords
	default:
		return builtinWords
	}
}

var techWords = []string{
	"app", "api", "code", "dev", "cloud", "data", "ai", "ml", "iot",
	"block", "chain", "crypto", "web", "mobile", "stack", "byte", "bit",
	"node", "react", "vue", "angular", "swift", "kotlin", "rust", "go",
	"python", "java", "script", "type", "sql", "git", "hub", "lab",
	"tech", "digital", "smart", "auto", "robot", "drone", "vr", "ar",
	"quantum", "neural", "deep", "learn", "model", "data", "mining",
	"analytics", "insight", "metrics", "dashboard", "report", "track",
	"monitor", "alert", "notify", "sync", "backup", "secure", "vault",
	"shield", "fire", "wall", "proxy", "vpn", "ssl", "tls",
}

var businessWords = []string{
	"pay", "buy", "sell", "trade", "market", "store", "shop", "cart",
	"checkout", "invoice", "bill", "tax", "fund", "invest", "bank",
	"loan", "credit", "debit", "wallet", "cash", "coin", "token",
	"stock", "bond", "equity", "asset", "portfolio", "wealth", "capital",
	"venture", "angel", "seed", "series", "round", "valuation", "exit",
	"ipo", "merger", "acquisition", "deal", "partner", "affiliate",
	"commission", "revenue", "profit", "margin", "cost", "price",
	"discount", "coupon", "promo", "loyalty", "reward", "points",
}

var creativeWords = []string{
	"design", "art", "creative", "studio", "gallery", "canvas", "color",
	"palette", "font", "type", "logo", "brand", "identity", "style",
	"fashion", "trend", "vogue", "chic", "sleek", "modern", "retro",
	"vintage", "classic", "elegant", "luxury", "premium", "elite",
	"craft", "handmade", "artisan", "custom", "bespoke", "unique",
	"rare", "exclusive", "limited", "special", "exclusive", "VIP",
	"magic", "wonder", "dream", "fantasy", "story", "narrative",
	"voice", "sound", "music", "rhythm", "beat", "pulse", "vibe",
}
