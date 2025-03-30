# Text-to-Image Generator

Yo project ek **Text-to-Image Generator** ho jun **FastAPI** (Python) backend ra **Next.js** (React) frontend ko sath banayeko cha. Yo **Hugging Face Inference API** ko upyog garera text prompts bata image generate garcha. Generated image haru **Cloudinary** ma upload garincha ra URL frontend ma direct path garera display garincha. Data management ko lagi **Prisma ORM** ra **PostgreSQL** ko upyog garincha, jaha generated image URLs ra prompts store garincha.

## Steps to Build:

### 1. **Backend Framework Setup**
   - FastAPI setup garne backend banai image generation handle garne.

### 2. **Frontend Framework Setup**
   - Next.js frontend setup garne jaha users le text prompts input garna sakincha.

### 3. **Hugging Face API Integration**
   - Text-to-image generation ko lagi Hugging Face API integrate garne.

### 4. **Database Setup with Prisma**
   - Prisma ORM setup garne ra PostgreSQL sanga connect garne.

### 5. **Define Database Models**
   - Image prompts ra URLs store garne ko lagi database schema define garne.

### 6. **User Authentication**
   - Optional: User authentication setup garne, jasma login/registration ko features huncha.

### 7. **Generate Image with Text Prompt**
   - User le diye ko text prompt ko basis ma image generate garne.

### 8. **Store Data in Database**
   - Generated image ko URL ra prompt database ma store garne.

### 9. **Cloud Storage Integration**
   - Image haru cloud storage (e.g., Cloudinary) ma upload garne ra URL store garne.

### 10. **Frontend Image Display**
   - Frontend ma generated image display garne.

### 11. **Notification System with React-Toastify**
   - **React-Toastify** ko madat le users lai success ya error messages dikhne.

### 12. **API Communication Between Frontend and Backend**
   - Frontend ra backend ko bich API calls garera data transfer garne.

### 13. **Testing Image Generation**
   - Image generation ko process test garne ra ensure garne sabai kura sahi cha.

### 14. **Deploy Backend**
   - FastAPI backend ko deployment garne jasto **Railway** ya **Render** platforms ma.

### 15. **Deploy Frontend**
   - Next.js frontend ko deployment garne jasto **Vercel** ya **Netlify** ma.
