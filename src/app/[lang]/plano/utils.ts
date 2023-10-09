export const setPremiumTrue = async (id: string | undefined, role: string | undefined, supabase: any) => {
  if(role == "corretor") {
    const { data, error } = await supabase
      .from('corretor')
      .update({ premium: true })
      .eq('id', id)
      
      if(!error) {
        return true
      } else {
        return false
      }
    } else if (role == "corporacao") {
    const { data, error } = await supabase
      .from('corporacao')
      .update({ premium: true })
      .eq('id', id)
      
      if(!error) {
        return true
      } else {
        return false
      }
  }
}

export const setPremiumFalse = async (id: string | undefined, role: string | undefined, supabase: any) => {
  if(role == "corretor") {
    const { data, error } = await supabase
      .from('corretor')
      .update({ premium: false })
      .eq('id', id)
      
      if(!error) {
        return true
      } else {
        return false
      }
  } else if (role == "corporacao") {
    const { data, error } = await supabase
      .from('corporacao')
      .update({ premium: false })
      .eq('id', id)
      
      if(!error) {
        return true
      } else {
        return false
      }
  }
}