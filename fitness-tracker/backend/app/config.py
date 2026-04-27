from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_SECRET_KEY: str = "your_super_secret_jwt_key_here" # In prod, load from env
    APP_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    DATABASE_URL: str = "sqlite:///./fitness_tracker.db"

    AI_MAX_TOKENS: int = 1024
    AI_TEMPERATURE: float = 0.7

    class Config:
        env_file = ".env"

settings = Settings()
